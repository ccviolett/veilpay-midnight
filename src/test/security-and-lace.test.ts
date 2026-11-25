// SPDX-License-Identifier: Apache-2.0
// Security edge cases, multi-run isolation, privacy scanner self-tests, and
// Midnight Lace DApp Connector API v4 tests.

import { describe, expect, it } from 'vitest';
import { pureCircuits } from '../../contract/managed/veilpay/contract/index.js';
import { VeilPayEngine, computeAdversarialRejectAmount } from '../midnight/engine.js';
import {
  auditPublicLedgerPrivacy,
  deterministicBytes32,
  utf8ToFixedBytes32,
} from '../midnight/privacy.js';
import { expectCircuitRejects } from '../midnight/sim.js';
import { connectMidnightWallet, detectMidnightWallets } from '../midnight/lace.ts';
import type { InitialAPI } from '@midnight-ntwrk/dapp-connector-api';

describe('VeilPay — Security Guards, Multi-Run Isolation & Privacy Scanner Verification', () => {
  it('enforces parameter validation on createPayrollRun, rotateAdmin, setComplianceAuditor, and proveIncomeThreshold', async () => {
    const engine = await VeilPayEngine.create({
      organizationLabel: 'SecurityGuard Corp',
      adminSecretKey: deterministicBytes32(7, 1),
      auditorSecretKey: deterministicBytes32(8, 1),
      employees: [{ id: 'alice', name: 'Alice', secretKey: deterministicBytes32(9, 1) }],
    });

    const zero32 = new Uint8Array(32);

    // Zero admin/auditor keys rejected
    await expectCircuitRejects(() => engine.rotateAdmin(zero32), 'cannot be zero');
    await expectCircuitRejects(() => engine.setComplianceAuditor(zero32), 'cannot be zero');

    // Invalid run configurations rejected
    await expectCircuitRejects(
      () =>
        engine.createPayrollRun({
          budgetCap: 0n,
          minAllocation: 100n,
          maxAllocation: 200n,
          expectedHeadcount: 1n,
        }),
      'Budget cap must be positive',
    );
    await expectCircuitRejects(
      () =>
        engine.createPayrollRun({
          budgetCap: 10_000n,
          minAllocation: 5_000n,
          maxAllocation: 3_000n,
          expectedHeadcount: 1n,
        }),
      'Minimum allocation cannot exceed maximum',
    );
    await expectCircuitRejects(
      () =>
        engine.createPayrollRun({
          budgetCap: 10_000n,
          minAllocation: 1_000n,
          maxAllocation: 15_000n,
          expectedHeadcount: 1n,
        }),
      'Maximum allocation cannot exceed budget cap',
    );
    await expectCircuitRejects(
      () =>
        engine.createPayrollRun({
          budgetCap: 10_000n,
          minAllocation: 1_000n,
          maxAllocation: 5_000n,
          expectedHeadcount: 0n,
        }),
      'between 1 and 1024',
    );

    // Zero initial accumulator salt rejected
    await expectCircuitRejects(
      () =>
        engine.createPayrollRun({
          budgetCap: 10_000n,
          minAllocation: 1_000n,
          maxAllocation: 5_000n,
          expectedHeadcount: 1n,
          initialSalt: zero32,
        }),
      'must be non-zero',
    );
  });

  it('isolates independent payroll runs and prevents cross-run voucher replay', async () => {
    const aliceSk = deterministicBytes32(81, 1);
    const engine = await VeilPayEngine.create({
      organizationLabel: 'MultiRun Treasury',
      adminSecretKey: deterministicBytes32(80, 1),
      auditorSecretKey: deterministicBytes32(82, 1),
      employees: [{ id: 'alice', name: 'Alice', secretKey: aliceSk }],
    });

    const run1 = await engine.createPayrollRun({
      budgetCap: 20_000n,
      minAllocation: 5_000n,
      maxAllocation: 15_000n,
      expectedHeadcount: 2n,
      initialSalt: deterministicBytes32(83, 1),
    });
    const run2 = await engine.createPayrollRun({
      budgetCap: 25_000n,
      minAllocation: 5_000n,
      maxAllocation: 15_000n,
      expectedHeadcount: 2n,
      initialSalt: deterministicBytes32(84, 1),
    });

    const v1 = await engine.issueVoucher({
      runId: run1,
      employeeId: 'alice',
      amount: 10_000n,
      voucherSalt: deterministicBytes32(85, 1),
      nextAccumulatorSalt: deterministicBytes32(86, 1),
    });
    const v2 = await engine.issueVoucher({
      runId: run2,
      employeeId: 'alice',
      amount: 11_000n,
      voucherSalt: deterministicBytes32(87, 1),
      nextAccumulatorSalt: deterministicBytes32(88, 1),
    });

    // Attempting to claim Run #1 voucher against Run #2 MUST fail!
    await expectCircuitRejects(
      () =>
        engine.claimVoucher({
          employeeId: 'alice',
          runId: run2,
          amount: 10_000n,
          voucherSalt: v1.voucherSalt,
        }),
      'Voucher commitment not found',
    );

    // Claiming each in its own run produces distinct unlinkable nullifiers
    const c1 = await engine.claimVoucher({
      employeeId: 'alice',
      runId: run1,
      amount: 10_000n,
      voucherSalt: v1.voucherSalt,
    });
    const c2 = await engine.claimVoucher({
      employeeId: 'alice',
      runId: run2,
      amount: 11_000n,
      voucherSalt: v2.voucherSalt,
    });

    expect(c1.nullifierHex).not.toBe(c2.nullifierHex);
    expect(engine.runLivePrivacyAudit().passed).toBe(true);
  });

  it('proves pureCircuits domain separation prevents key collision across roles and contracts', () => {
    const sk = deterministicBytes32(77, 3);
    const orgA = utf8ToFixedBytes32('Org-Alpha');
    const orgB = utf8ToFixedBytes32('Org-Beta');
    const contractA = deterministicBytes32(1, 9);
    const contractB = deterministicBytes32(2, 9);

    const adminA = pureCircuits.deriveAdminKey(sk, orgA);
    const auditorA = pureCircuits.deriveAuditorKey(sk, orgA);
    const adminB = pureCircuits.deriveAdminKey(sk, orgB);
    const empA = pureCircuits.deriveEmployeeKey(sk, contractA);
    const empB = pureCircuits.deriveEmployeeKey(sk, contractB);

    expect(adminA).not.toEqual(auditorA);
    expect(adminA).not.toEqual(adminB);
    expect(empA).not.toEqual(empB);
  });

  it('privacy auditor actively catches intentional leaks (proving the scanner is not a no-op)', () => {
    const leakedKey = deterministicBytes32(55, 5);
    const fakeLedger = {
      nested: {
        exposedBytes: leakedKey,
        exposedSalary: 12_345n,
      },
    };
    const report = auditPublicLedgerPrivacy(
      fakeLedger,
      { secretKey: leakedKey },
      { salary: 12_345n },
    );
    expect(report.passed).toBe(false);
    expect(report.leaks).toHaveLength(2);
    expect(report.leaks[0]!.foundAt).toBe('ledger.nested.exposedBytes');
    expect(report.leaks[1]!.foundAt).toBe('ledger.nested.exposedSalary');
  });

  it('detects and connects to an injected Midnight Lace v4 DApp Connector provider', async () => {
    const mockConnected = {
      getShieldedAddresses: async () => ({
        shieldedAddress: 'mn_shield-addr_preprod1demo',
        shieldedCoinPublicKey: 'mn_shield-cpk_preprod1demo',
        shieldedEncryptionPublicKey: 'mn_shield-epk_preprod1demo',
      }),
      getUnshieldedAddress: async () => ({
        unshieldedAddress: 'mn_addr_preprod1demo',
      }),
      getDustAddress: async () => ({
        dustAddress: 'mn_dust_preprod1demo',
      }),
      getDustBalance: async () => ({ balance: 42_000n, cap: 100_000n }),
      getShieldedBalances: async () => ({ tNIGHT: 500_000n }),
      getUnshieldedBalances: async () => ({ tNIGHT: 250_000n }),
    };

    const mockInitial = {
      name: 'Midnight Lace',
      apiVersion: '4.1.0',
      rdns: 'io.lace.midnight',
      icon: '',
      connect: async () => mockConnected,
    } as unknown as InitialAPI;

    const prevWindow = (globalThis as { window?: unknown }).window;
    (globalThis as { window?: unknown }).window = {
      midnight: {
        mnLace: mockInitial,
      },
    };

    try {
      const detected = detectMidnightWallets();
      expect(detected).toHaveLength(1);
      expect(detected[0]!.id).toBe('mnLace');

      const session = await connectMidnightWallet(detected[0]!, 'preprod');
      expect(session.walletName).toBe('Midnight Lace');
      expect(session.networkId).toBe('preprod');
      expect(session.shieldedAddress).toBe('mn_shield-addr_preprod1demo');
      expect(session.dustBalance).toBe(42_000n);
    } finally {
      (globalThis as { window?: unknown }).window = prevWindow;
    }
  });

  it('guarantees UI adversarial reject amount triggers real circuit rejections on both fresh and partially spent runs', async () => {
    const engine = await VeilPayEngine.create({
      organizationLabel: 'AdversarialDemo Corp',
      adminSecretKey: deterministicBytes32(91, 1),
      auditorSecretKey: deterministicBytes32(92, 1),
      employees: [{ id: 'alice', name: 'Alice', secretKey: deterministicBytes32(93, 1) }],
    });

    const runId = await engine.createPayrollRun({
      budgetCap: 35_000n,
      minAllocation: 4_000n,
      maxAllocation: 18_000n,
      expectedHeadcount: 4n,
    });

    // Case 1: Fresh run ($0 spent, remaining $35,000 > max band $18,000) -> maxAllocation + 1 triggers band rejection
    const runFresh = engine.getPublicSnapshot().runs[0]!.run;
    const freshBad = computeAdversarialRejectAmount(runFresh, 0n);
    expect(freshBad).toBe(18_001n);
    await expectCircuitRejects(
      () => engine.issueVoucher({ runId, employeeId: 'alice', amount: freshBad }),
      'exceeds payroll run maximum band',
    );

    // Case 2: Partially spent Q4 Demo state ($29,000 spent, remaining $6,000) -> $6,500 triggers budget-cap rejection
    await engine.issueVoucher({ runId, employeeId: 'alice', amount: 12_750n });
    await engine.issueVoucher({ runId, employeeId: 'alice', amount: 9_400n });
    await engine.issueVoucher({ runId, employeeId: 'alice', amount: 6_850n });

    const spent = engine.treasuryAccumulators.get(runId.toString())!.total;
    expect(spent).toBe(29_000n);
    const capBad = computeAdversarialRejectAmount(runFresh, spent);
    expect(capBad).toBe(6_500n);
    await expectCircuitRejects(
      () => engine.issueVoucher({ runId, employeeId: 'alice', amount: capBad }),
      'exceed payroll run budget cap',
    );
  });
});
