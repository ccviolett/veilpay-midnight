// SPDX-License-Identifier: Apache-2.0
// Comprehensive Vitest suite for VeilPay on Midnight Compact 0.28 / compact-runtime 0.21.0.
// Exercises ALL 8 circuits, multi-actor private states, adversarial rejections,
// HistoricMerkleTree unlinkable claims, selective disclosure proofs, and automated
// byte-level public ledger privacy invariant audits.

import { describe, expect, it } from 'vitest';
import { pureCircuits, RunStatus } from '../../contract/managed/veilpay/contract/index.js';
import { VeilPayEngine } from '../midnight/engine.js';
import {
  assertNoPublicStateLeaks,
  bytesToHex,
  deterministicBytes32,
  hexToBytes,
} from '../midnight/privacy.js';
import { expectCircuitRejects } from '../midnight/sim.js';

function createTestSecrets() {
  return {
    adminSk: deterministicBytes32(1, 1),
    auditorSk: deterministicBytes32(2, 1),
    attackerSk: deterministicBytes32(99, 9),
    aliceSk: deterministicBytes32(10, 1),
    bobSk: deterministicBytes32(20, 1),
    charlieSk: deterministicBytes32(30, 1),
    newAdminSk: deterministicBytes32(44, 2),
  };
}

async function deployTestVault() {
  const s = createTestSecrets();
  const engine = await VeilPayEngine.create({
    organizationLabel: 'AcmeShield Labs DAO',
    adminSecretKey: s.adminSk,
    auditorSecretKey: s.auditorSk,
    employees: [
      { id: 'alice', name: 'Alice', secretKey: s.aliceSk },
      { id: 'bob', name: 'Bob', secretKey: s.bobSk },
      { id: 'charlie', name: 'Charlie', secretKey: s.charlieSk },
    ],
  });
  return { engine, s };
}

describe('VeilPay — Midnight Dual-Ledger Payroll & Selective Disclosure', () => {
  it('deploys with sealed organizationId and witness-derived admin/auditor keys (zero secret leak)', async () => {
    const { engine, s } = await deployTestVault();
    const snap = engine.getPublicSnapshot();

    expect(snap.runCount).toBe(0n);
    expect(snap.voucherTreeSize).toBe(0n);
    expect(snap.treasuryAdminHex).toBe(
      bytesToHex(pureCircuits.deriveAdminKey(s.adminSk, engine.organizationId)),
    );
    expect(snap.complianceAuditorHex).toBe(
      bytesToHex(pureCircuits.deriveAuditorKey(s.auditorSk, engine.organizationId)),
    );

    const audit = engine.runLivePrivacyAudit();
    expect(audit.passed).toBe(true);
    expect(audit.leaks).toEqual([]);
  });

  it('executes full shielded payroll lifecycle: create run -> issue hidden vouchers -> unlinkable claims -> income proof -> finalize -> aggregate audit', async () => {
    const { engine, s } = await deployTestVault();

    // 1. Treasury opens Q4 Payroll Run: Cap $35,000, Band [$4,000, $18,000], Headcount 3
    const runId = await engine.createPayrollRun({
      budgetCap: 35_000n,
      minAllocation: 4_000n,
      maxAllocation: 18_000n,
      expectedHeadcount: 3n,
      initialSalt: deterministicBytes32(100, 1),
    });
    expect(runId).toBe(1n);

    // 2. Treasury issues 3 shielded vouchers (total = 12,750 + 9,400 + 6,850 = 29,000 <= 35,000)
    const vAlice = await engine.issueVoucher({
      runId,
      employeeId: 'alice',
      amount: 12_750n,
      voucherSalt: deterministicBytes32(101, 1),
      nextAccumulatorSalt: deterministicBytes32(102, 1),
    });
    const vBob = await engine.issueVoucher({
      runId,
      employeeId: 'bob',
      amount: 9_400n,
      voucherSalt: deterministicBytes32(103, 1),
      nextAccumulatorSalt: deterministicBytes32(104, 1),
    });
    const vCharlie = await engine.issueVoucher({
      runId,
      employeeId: 'charlie',
      amount: 6_850n,
      voucherSalt: deterministicBytes32(105, 1),
      nextAccumulatorSalt: deterministicBytes32(106, 1),
    });

    // Verify public state exposes headcount & tree size, NEVER individual salaries or running total
    const afterIssue = engine.getPublicSnapshot();
    expect(afterIssue.runs[0]!.run.issuedCount).toBe(3n);
    expect(afterIssue.runs[0]!.run.claimedCount).toBe(0n);
    expect(afterIssue.voucherTreeSize).toBe(3n);
    expect(afterIssue.runs[0]!.auditedTotal).toBeNull();

    // Automated byte + scalar privacy audit BEFORE claims
    assertNoPublicStateLeaks(
      engine.sim.ledger(),
      {
        adminSk: s.adminSk,
        auditorSk: s.auditorSk,
        aliceSk: s.aliceSk,
        bobSk: s.bobSk,
        charlieSk: s.charlieSk,
        aliceKey: engine.employees.get('alice')!.derivedKey,
        bobKey: engine.employees.get('bob')!.derivedKey,
        charlieKey: engine.employees.get('charlie')!.derivedKey,
        aliceSalt: vAlice.voucherSalt,
        bobSalt: vBob.voucherSalt,
        charlieSalt: vCharlie.voucherSalt,
      },
      {
        aliceSalary: 12_750n,
        bobSalary: 9_400n,
        charlieSalary: 6_850n,
        hiddenTotal: 29_000n,
      },
    );

    // 3. Alice & Bob claim their vouchers via unlinkable HistoricMerkleTree proofs
    const claimAlice = await engine.claimVoucher({
      employeeId: 'alice',
      runId,
      amount: 12_750n,
      voucherSalt: vAlice.voucherSalt,
    });
    const claimBob = await engine.claimVoucher({
      employeeId: 'bob',
      runId,
      amount: 9_400n,
      voucherSalt: vBob.voucherSalt,
    });

    expect(claimAlice.nullifierHex).not.toBe(claimBob.nullifierHex);
    expect(claimAlice.nullifierHex).not.toBe(vAlice.commitmentHex);
    expect(engine.getPublicSnapshot().runs[0]!.run.claimedCount).toBe(2n);

    // 4. Selective Disclosure (Employee): Alice proves salary >= $10,000 for mortgage lender
    //    WITHOUT revealing her exact $12,750 salary!
    const { attestationIdHex } = await engine.proveIncomeThreshold({
      employeeId: 'alice',
      runId,
      actualAmount: 12_750n,
      voucherSalt: vAlice.voucherSalt,
      thresholdAmount: 10_000n,
      verifierLabel: 'MetroBank-Mortgage-2026',
    });
    const snapAfterProof = engine.getPublicSnapshot();
    expect(snapAfterProof.attestations).toHaveLength(1);
    expect(snapAfterProof.attestations[0]!.attestationIdHex).toBe(attestationIdHex);
    expect(snapAfterProof.attestations[0]!.attestation.thresholdAmount).toBe(10_000n);

    // 5. Treasury finalizes run; Charlie can STILL claim after finalization!
    await engine.finalizeRun(runId);
    expect(engine.getPublicSnapshot().runs[0]!.run.status).toBe(RunStatus.Finalized);

    await engine.claimVoucher({
      employeeId: 'charlie',
      runId,
      amount: 6_850n,
      voucherSalt: vCharlie.voucherSalt,
    });
    expect(engine.getPublicSnapshot().runs[0]!.run.claimedCount).toBe(3n);

    // 6. Selective Disclosure (Compliance Auditor): Discloses ONLY aggregate total ($29,000)
    const auditedTotal = await engine.discloseRunTotal({ runId, actor: 'auditor' });
    expect(auditedTotal).toBe(29_000n);
    expect(engine.getPublicSnapshot().runs[0]!.run.status).toBe(RunStatus.Audited);
    expect(engine.getPublicSnapshot().runs[0]!.auditedTotal).toBe(29_000n);

    // 7. Even AFTER aggregate audit, ZERO individual salaries or employee keys exist on ledger!
    const finalAudit = engine.runLivePrivacyAudit();
    expect(finalAudit.passed).toBe(true);
    expect(finalAudit.inspectedByteEntries).toBeGreaterThan(5);
    expect(finalAudit.leaks).toEqual([]);
  });

  it('enforces ZK budget cap across hidden cumulative allocations without revealing running spend', async () => {
    const { engine } = await deployTestVault();

    const runId = await engine.createPayrollRun({
      budgetCap: 20_000n,
      minAllocation: 1_000n,
      maxAllocation: 15_000n,
      expectedHeadcount: 3n,
      initialSalt: deterministicBytes32(11, 1),
    });

    await engine.issueVoucher({
      runId,
      employeeId: 'alice',
      amount: 14_000n,
      voucherSalt: deterministicBytes32(12, 1),
      nextAccumulatorSalt: deterministicBytes32(13, 1),
    });

    // Attempting to issue $7,000 (14,000 + 7,000 = 21,000 > 20,000 cap) MUST reject!
    await expectCircuitRejects(
      () =>
        engine.issueVoucher({
          runId,
          employeeId: 'bob',
          amount: 7_000n,
          voucherSalt: deterministicBytes32(14, 1),
          nextAccumulatorSalt: deterministicBytes32(15, 1),
        }),
      'exceed payroll run budget cap',
    );

    // State must remain clean; issuing $6,000 (exact cap = 20,000) succeeds!
    await engine.issueVoucher({
      runId,
      employeeId: 'bob',
      amount: 6_000n,
      voucherSalt: deterministicBytes32(16, 1),
      nextAccumulatorSalt: deterministicBytes32(17, 1),
    });
    expect(engine.getPublicSnapshot().runs[0]!.run.issuedCount).toBe(2n);
  });

  it('enforces salary compensation band limits, headcount cap, and fresh accumulator salt', async () => {
    const { engine } = await deployTestVault();

    const runId = await engine.createPayrollRun({
      budgetCap: 50_000n,
      minAllocation: 5_000n,
      maxAllocation: 12_000n,
      expectedHeadcount: 1n,
      initialSalt: deterministicBytes32(21, 1),
    });

    // Below minimum band
    await expectCircuitRejects(
      () =>
        engine.issueVoucher({
          runId,
          employeeId: 'alice',
          amount: 4_999n,
          voucherSalt: deterministicBytes32(22, 1),
          nextAccumulatorSalt: deterministicBytes32(23, 1),
        }),
      'below payroll run minimum band',
    );

    // Above maximum band
    await expectCircuitRejects(
      () =>
        engine.issueVoucher({
          runId,
          employeeId: 'alice',
          amount: 12_001n,
          voucherSalt: deterministicBytes32(22, 1),
          nextAccumulatorSalt: deterministicBytes32(23, 1),
        }),
      'exceeds payroll run maximum band',
    );

    // Reusing previous accumulator salt rejected
    await expectCircuitRejects(
      () =>
        engine.issueVoucher({
          runId,
          employeeId: 'alice',
          amount: 8_000n,
          voucherSalt: deterministicBytes32(22, 1),
          nextAccumulatorSalt: deterministicBytes32(21, 1),
        }),
      'must differ from previous salt',
    );

    // Valid voucher fills headcount = 1
    await engine.issueVoucher({
      runId,
      employeeId: 'alice',
      amount: 8_000n,
      voucherSalt: deterministicBytes32(24, 1),
      nextAccumulatorSalt: deterministicBytes32(25, 1),
    });

    // Second voucher exceeds expectedHeadcount = 1
    await expectCircuitRejects(
      () =>
        engine.issueVoucher({
          runId,
          employeeId: 'bob',
          amount: 6_000n,
          voucherSalt: deterministicBytes32(26, 1),
          nextAccumulatorSalt: deterministicBytes32(27, 1),
        }),
      'headcount limit reached',
    );
  });

  it('prevents double-claiming via unlinkable nullifiers and rejects forged/stolen claims', async () => {
    const { engine, s } = await deployTestVault();

    const runId = await engine.createPayrollRun({
      budgetCap: 30_000n,
      minAllocation: 2_000n,
      maxAllocation: 15_000n,
      expectedHeadcount: 2n,
      initialSalt: deterministicBytes32(31, 1),
    });

    const vAlice = await engine.issueVoucher({
      runId,
      employeeId: 'alice',
      amount: 11_000n,
      voucherSalt: deterministicBytes32(32, 1),
      nextAccumulatorSalt: deterministicBytes32(33, 1),
    });

    // 1. Bob tries to claim Alice's voucher (even knowing amount + salt!) -> fails Merkle lookup
    await expectCircuitRejects(
      () =>
        engine.claimVoucher({
          employeeId: 'bob',
          runId,
          amount: 11_000n,
          voucherSalt: vAlice.voucherSalt,
        }),
      'Voucher commitment not found',
    );

    // 2. Alice tries to inflate her salary to $12,000 -> commitment mismatch
    await expectCircuitRejects(
      () =>
        engine.claimVoucher({
          employeeId: 'alice',
          runId,
          amount: 12_000n,
          voucherSalt: vAlice.voucherSalt,
        }),
      'Voucher commitment not found',
    );

    // 3. Alice claims validly once
    await engine.claimVoucher({
      employeeId: 'alice',
      runId,
      amount: 11_000n,
      voucherSalt: vAlice.voucherSalt,
    });

    // Issue a second voucher so claimedCount < issuedCount, then test Alice double-claiming!
    await engine.issueVoucher({
      runId,
      employeeId: 'bob',
      amount: 7_000n,
      voucherSalt: deterministicBytes32(34, 1),
      nextAccumulatorSalt: deterministicBytes32(35, 1),
    });

    // 4. Alice attempts to replay her claim -> rejected by claimedNullifiers Set!
    await expectCircuitRejects(
      () =>
        engine.claimVoucher({
          employeeId: 'alice',
          runId,
          amount: 11_000n,
          voucherSalt: vAlice.voucherSalt,
        }),
      'already been claimed',
    );

    // 5. External attacker key cannot claim either
    await expectCircuitRejects(
      () =>
        engine.claimVoucher({
          employeeId: 'alice',
          runId,
          amount: 11_000n,
          voucherSalt: vAlice.voucherSalt,
          callerSecretKeyOverride: s.attackerSk,
        }),
      'Voucher commitment not found',
    );
  });

  it('rejects false income threshold proofs when threshold exceeds actual hidden salary', async () => {
    const { engine } = await deployTestVault();

    const runId = await engine.createPayrollRun({
      budgetCap: 30_000n,
      minAllocation: 2_000n,
      maxAllocation: 15_000n,
      expectedHeadcount: 2n,
      initialSalt: deterministicBytes32(41, 1),
    });

    const vBob = await engine.issueVoucher({
      runId,
      employeeId: 'bob',
      amount: 7_500n,
      voucherSalt: deterministicBytes32(42, 1),
      nextAccumulatorSalt: deterministicBytes32(43, 1),
    });

    // Requesting proof for >= $8,000 when hidden salary is $7,500 MUST reject!
    await expectCircuitRejects(
      () =>
        engine.proveIncomeThreshold({
          employeeId: 'bob',
          runId,
          actualAmount: 7_500n,
          voucherSalt: vBob.voucherSalt,
          thresholdAmount: 8_000n,
          verifierLabel: 'Landlord-NYC',
        }),
      'below the requested income threshold',
    );

    // Exact boundary ($7,500 >= $7,500) succeeds!
    const { attestationIdHex } = await engine.proveIncomeThreshold({
      employeeId: 'bob',
      runId,
      actualAmount: 7_500n,
      voucherSalt: vBob.voucherSalt,
      thresholdAmount: 7_500n,
      verifierLabel: 'Landlord-NYC',
    });
    expect(attestationIdHex).toHaveLength(64);
  });

  it('rejects tampered aggregate audit openings and unauthorized callers, and supports admin key rotation', async () => {
    const { engine, s } = await deployTestVault();

    // Unauthorized attacker cannot create payroll run
    await expectCircuitRejects(
      () =>
        engine.createPayrollRun({
          budgetCap: 10_000n,
          minAllocation: 1_000n,
          maxAllocation: 5_000n,
          expectedHeadcount: 2n,
          callerSecretKey: s.attackerSk,
        }),
      'not the treasury admin',
    );

    const runId = await engine.createPayrollRun({
      budgetCap: 25_000n,
      minAllocation: 3_000n,
      maxAllocation: 15_000n,
      expectedHeadcount: 2n,
      initialSalt: deterministicBytes32(51, 1),
    });

    // Cannot finalize empty run
    await expectCircuitRejects(
      () => engine.finalizeRun(runId),
      'zero issued vouchers',
    );

    await engine.issueVoucher({
      runId,
      employeeId: 'alice',
      amount: 9_000n,
      voucherSalt: deterministicBytes32(52, 1),
      nextAccumulatorSalt: deterministicBytes32(53, 1),
    });

    // Cannot disclose total before finalization
    await expectCircuitRejects(
      () => engine.discloseRunTotal({ runId, actor: 'auditor' }),
      'must be finalized',
    );

    await engine.finalizeRun(runId);

    // Cannot issue voucher after finalization
    await expectCircuitRejects(
      () =>
        engine.issueVoucher({
          runId,
          employeeId: 'bob',
          amount: 5_000n,
          voucherSalt: deterministicBytes32(54, 1),
          nextAccumulatorSalt: deterministicBytes32(55, 1),
        }),
      'no longer open',
    );

    // Unauthorized employee cannot audit
    await expectCircuitRejects(
      () =>
        engine.discloseRunTotal({
          runId,
          callerSecretKeyOverride: s.aliceSk,
        }),
      'not authorized to audit',
    );

    // Auditor lying about total ($8,000 instead of $9,000) -> rejected by commitment check!
    await expectCircuitRejects(
      () =>
        engine.discloseRunTotal({
          runId,
          actor: 'auditor',
          overrideOpening: {
            total: 8_000n,
            salt: deterministicBytes32(53, 1),
          },
        }),
      'does not match committed running total',
    );

    // Honest auditor succeeds
    expect(await engine.discloseRunTotal({ runId, actor: 'auditor' })).toBe(9_000n);

    // Rotate treasury admin to newAdminSk
    const newAdminKey = pureCircuits.deriveAdminKey(s.newAdminSk, engine.organizationId);
    await engine.rotateAdmin(newAdminKey);

    // Old admin is immediately rejected
    await expectCircuitRejects(
      () =>
        engine.createPayrollRun({
          budgetCap: 10_000n,
          minAllocation: 1_000n,
          maxAllocation: 5_000n,
          expectedHeadcount: 1n,
          callerSecretKey: s.adminSk,
        }),
      'not the treasury admin',
    );

    // New admin succeeds
    const run2 = await engine.createPayrollRun({
      budgetCap: 10_000n,
      minAllocation: 1_000n,
      maxAllocation: 5_000n,
      expectedHeadcount: 1n,
      callerSecretKey: s.newAdminSk,
    });
    expect(run2).toBe(2n);
  });

  it('validates HistoricMerkleTree proofs remain valid across concurrent voucher insertions (non-stale roots)', async () => {
    const { engine } = await deployTestVault();

    const runId = await engine.createPayrollRun({
      budgetCap: 40_000n,
      minAllocation: 5_000n,
      maxAllocation: 15_000n,
      expectedHeadcount: 3n,
      initialSalt: deterministicBytes32(61, 1),
    });

    // Issue voucher for Alice first, then insert Bob & Charlie into the same HistoricMerkleTree
    const vAlice = await engine.issueVoucher({
      runId,
      employeeId: 'alice',
      amount: 10_500n,
      voucherSalt: deterministicBytes32(62, 1),
      nextAccumulatorSalt: deterministicBytes32(63, 1),
    });
    await engine.issueVoucher({
      runId,
      employeeId: 'bob',
      amount: 8_250n,
      voucherSalt: deterministicBytes32(64, 1),
      nextAccumulatorSalt: deterministicBytes32(65, 1),
    });
    await engine.issueVoucher({
      runId,
      employeeId: 'charlie',
      amount: 6_750n,
      voucherSalt: deterministicBytes32(66, 1),
      nextAccumulatorSalt: deterministicBytes32(67, 1),
    });

    // Verify Alice's commitment is in tree and she can claim AND prove income cleanly
    const aliceCommitment = hexToBytes(vAlice.commitmentHex);
    expect(engine.sim.ledger().voucherTree.findPathForLeaf(aliceCommitment)).toBeDefined();

    await engine.claimVoucher({
      employeeId: 'alice',
      runId,
      amount: 10_500n,
      voucherSalt: vAlice.voucherSalt,
    });
    const proof = await engine.proveIncomeThreshold({
      employeeId: 'alice',
      runId,
      actualAmount: 10_500n,
      voucherSalt: vAlice.voucherSalt,
      thresholdAmount: 10_000n,
      verifierLabel: 'TaxAuthority-2026',
    });
    expect(proof.attestationIdHex).toHaveLength(64);
  });
});
