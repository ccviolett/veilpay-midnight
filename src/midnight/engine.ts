// SPDX-License-Identifier: Apache-2.0
// VeilPay Multi-Actor Dual-Ledger Engine.
// Orchestrates isolated per-device private states (Treasury Admin, Compliance
// Auditor, and Employees) executing real compiled Compact circuits against a
// shared Midnight public ledger via @midnight-ntwrk/compact-runtime.

import {
  Contract,
  RunStatus,
  ledger as decodeLedger,
  pureCircuits,
  type IncomeAttestation,
  type Ledger,
  type PayrollRun,
} from '../../contract/managed/veilpay/contract/index.js';
import {
  createVeilPayPrivateState,
  witnesses,
  type RunAccumulatorSecret,
  type VeilPayPrivateState,
} from '../../contract/witnesses.js';
import { CompactSimulator } from './sim.js';
import {
  auditPublicLedgerPrivacy,
  bytesToHex,
  hexToBytes,
  randomBytes32,
  utf8ToFixedBytes32,
  type PrivacyAuditReport,
} from './privacy.js';

export type VeilPayContract = Contract<VeilPayPrivateState>;

export interface EmployeeVoucherReceipt {
  readonly id: string;
  readonly runId: bigint;
  readonly recipientId: string;
  readonly recipientName: string;
  readonly amount: bigint;
  readonly voucherSalt: Uint8Array;
  readonly commitmentHex: string;
  claimed: boolean;
  nullifierHex?: string;
}

export interface ParticipantVault {
  readonly id: string;
  readonly name: string;
  readonly role: 'admin' | 'auditor' | 'employee';
  readonly secretKey: Uint8Array;
  readonly derivedKey: Uint8Array;
  readonly vouchers: EmployeeVoucherReceipt[];
}

export interface CircuitEventLog {
  readonly seq: number;
  readonly timestamp: string;
  readonly actor: string;
  readonly circuit: string;
  readonly status: 'accepted' | 'rejected';
  readonly summary: string;
  readonly disclosedFields: string[];
  readonly keptPrivateFields: string[];
}

export interface PublicLedgerSnapshot {
  readonly contractAddress: string;
  readonly organizationIdHex: string;
  readonly treasuryAdminHex: string;
  readonly complianceAuditorHex: string;
  readonly runCount: bigint;
  readonly voucherTreeSize: bigint;
  readonly voucherTreeRootHex: string;
  readonly claimedNullifiers: string[];
  readonly runs: Array<{
    readonly runId: bigint;
    readonly run: PayrollRun;
    readonly runningTotalCommitmentHex: string;
    readonly auditedTotal: bigint | null;
  }>;
  readonly attestations: Array<{
    readonly attestationIdHex: string;
    readonly attestation: IncomeAttestation;
  }>;
}

export interface VeilPayCreateOptions {
  readonly organizationLabel: string;
  readonly adminSecretKey?: Uint8Array;
  readonly auditorSecretKey?: Uint8Array;
  readonly employees?: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly secretKey?: Uint8Array;
  }>;
}

export class VeilPayEngine {
  readonly sim: CompactSimulator<VeilPayContract, VeilPayPrivateState, Ledger>;
  readonly organizationLabel: string;
  readonly organizationId: Uint8Array;
  readonly contractAddressBytes: Uint8Array;

  readonly admin: ParticipantVault;
  readonly auditor: ParticipantVault;
  readonly employees: Map<string, ParticipantVault>;
  readonly treasuryAccumulators: Map<string, RunAccumulatorSecret> = new Map();
  readonly issuedVoucherSecrets: EmployeeVoucherReceipt[] = [];
  readonly auditLog: CircuitEventLog[] = [];

  private eventSeq = 0;

  private constructor(
    sim: CompactSimulator<VeilPayContract, VeilPayPrivateState, Ledger>,
    organizationLabel: string,
    organizationId: Uint8Array,
    admin: ParticipantVault,
    auditor: ParticipantVault,
    employees: Map<string, ParticipantVault>,
  ) {
    this.sim = sim;
    this.organizationLabel = organizationLabel;
    this.organizationId = organizationId;
    this.contractAddressBytes = hexToBytes(sim.address);
    this.admin = admin;
    this.auditor = auditor;
    this.employees = employees;
  }

  static async create(opts: VeilPayCreateOptions): Promise<VeilPayEngine> {
    const orgId = utf8ToFixedBytes32(opts.organizationLabel);
    const adminSk = opts.adminSecretKey ?? randomBytes32();
    const auditorSk = opts.auditorSecretKey ?? randomBytes32();

    const contract = new Contract<VeilPayPrivateState>(witnesses);
    const sim = await CompactSimulator.deploy({
      contract,
      ledger: decodeLedger,
      privateState: createVeilPayPrivateState(adminSk),
      args: [orgId],
    });

    const instanceBytes = hexToBytes(sim.address);
    const adminKey = pureCircuits.deriveAdminKey(adminSk, orgId);
    const auditorKey = pureCircuits.deriveAuditorKey(auditorSk, orgId);

    const adminVault: ParticipantVault = {
      id: 'admin',
      name: 'Treasury Admin',
      role: 'admin',
      secretKey: adminSk,
      derivedKey: adminKey,
      vouchers: [],
    };

    const auditorVault: ParticipantVault = {
      id: 'auditor',
      name: 'Compliance Auditor',
      role: 'auditor',
      secretKey: auditorSk,
      derivedKey: auditorKey,
      vouchers: [],
    };

    const employeeMap = new Map<string, ParticipantVault>();
    const defaultEmployees = opts.employees ?? [
      { id: 'alice', name: 'Alice Chen (Staff ZK Engineer)' },
      { id: 'bob', name: 'Bob Patel (Protocol Security)' },
      { id: 'charlie', name: 'Charlie Sato (Product Design)' },
    ];

    for (const emp of defaultEmployees) {
      const sk = emp.secretKey ?? randomBytes32();
      const derived = pureCircuits.deriveEmployeeKey(sk, instanceBytes);
      employeeMap.set(emp.id, {
        id: emp.id,
        name: emp.name,
        role: 'employee',
        secretKey: sk,
        derivedKey: derived,
        vouchers: [],
      });
    }

    const engine = new VeilPayEngine(
      sim,
      opts.organizationLabel,
      orgId,
      adminVault,
      auditorVault,
      employeeMap,
    );

    engine.recordLog({
      actor: 'Treasury Admin',
      circuit: 'constructor',
      status: 'accepted',
      summary: `Deployed VeilPay vault for "${opts.organizationLabel}"`,
      disclosedFields: ['organizationId', 'treasuryAdmin', 'complianceAuditor (default)'],
      keptPrivateFields: ['adminSecretKey'],
    });

    // Delegate dedicated Compliance Auditor key immediately after deploy.
    await engine.setComplianceAuditor(auditorKey);

    return engine;
  }

  private recordLog(entry: Omit<CircuitEventLog, 'seq' | 'timestamp'>): void {
    this.eventSeq += 1;
    this.auditLog.unshift({
      seq: this.eventSeq,
      timestamp: new Date().toISOString(),
      ...entry,
    });
  }

  private getTreasuryAccumulatorRecord(): Record<string, RunAccumulatorSecret> {
    const record: Record<string, RunAccumulatorSecret> = {};
    for (const [k, v] of this.treasuryAccumulators.entries()) {
      record[k] = v;
    }
    return record;
  }

  async setComplianceAuditor(
    newAuditorKey: Uint8Array,
    callerSecretKey: Uint8Array = this.admin.secretKey,
  ): Promise<void> {
    this.sim.withPrivateState(createVeilPayPrivateState(callerSecretKey));
    try {
      await this.sim.call('setComplianceAuditor', newAuditorKey);
      this.recordLog({
        actor: 'Treasury Admin',
        circuit: 'setComplianceAuditor',
        status: 'accepted',
        summary: `Assigned Compliance Auditor key ${bytesToHex(newAuditorKey).slice(0, 12)}…`,
        disclosedFields: ['complianceAuditor'],
        keptPrivateFields: ['adminSecretKey', 'auditorSecretKey'],
      });
    } catch (err) {
      this.recordLog({
        actor: 'Caller',
        circuit: 'setComplianceAuditor',
        status: 'rejected',
        summary: err instanceof Error ? err.message : String(err),
        disclosedFields: [],
        keptPrivateFields: ['callerSecretKey'],
      });
      throw err;
    }
  }

  async rotateAdmin(
    newAdminKey: Uint8Array,
    callerSecretKey: Uint8Array = this.admin.secretKey,
  ): Promise<void> {
    this.sim.withPrivateState(createVeilPayPrivateState(callerSecretKey));
    try {
      await this.sim.call('rotateAdmin', newAdminKey);
      this.recordLog({
        actor: 'Treasury Admin',
        circuit: 'rotateAdmin',
        status: 'accepted',
        summary: `Rotated Treasury Admin key to ${bytesToHex(newAdminKey).slice(0, 12)}…`,
        disclosedFields: ['treasuryAdmin'],
        keptPrivateFields: ['adminSecretKey'],
      });
    } catch (err) {
      this.recordLog({
        actor: 'Caller',
        circuit: 'rotateAdmin',
        status: 'rejected',
        summary: err instanceof Error ? err.message : String(err),
        disclosedFields: [],
        keptPrivateFields: ['callerSecretKey'],
      });
      throw err;
    }
  }

  async createPayrollRun(params: {
    budgetCap: bigint;
    minAllocation: bigint;
    maxAllocation: bigint;
    expectedHeadcount: bigint;
    initialSalt?: Uint8Array;
    callerSecretKey?: Uint8Array;
  }): Promise<bigint> {
    const initialSalt = params.initialSalt ?? randomBytes32();
    const callerSk = params.callerSecretKey ?? this.admin.secretKey;
    this.sim.withPrivateState(
      createVeilPayPrivateState(callerSk, {
        runAccumulators: this.getTreasuryAccumulatorRecord(),
        pendingNextRunSalt: initialSalt,
      }),
    );

    try {
      const { result: runId } = await this.sim.call(
        'createPayrollRun',
        params.budgetCap,
        params.minAllocation,
        params.maxAllocation,
        params.expectedHeadcount,
      );
      this.treasuryAccumulators.set(runId.toString(), {
        total: 0n,
        salt: initialSalt,
      });
      this.recordLog({
        actor: 'Treasury Admin',
        circuit: 'createPayrollRun',
        status: 'accepted',
        summary: `Opened Run #${runId} (cap $${params.budgetCap.toLocaleString()}, band $${params.minAllocation.toLocaleString()}–$${params.maxAllocation.toLocaleString()}, max ${params.expectedHeadcount} staff)`,
        disclosedFields: [
          `runId=#${runId}`,
          'budgetCap',
          'minAllocation',
          'maxAllocation',
          'expectedHeadcount',
          'runningTotalCommitment (hiding)',
        ],
        keptPrivateFields: ['adminSecretKey', 'initialAccumulatorSalt'],
      });
      return runId;
    } catch (err) {
      this.recordLog({
        actor: 'Treasury Admin',
        circuit: 'createPayrollRun',
        status: 'rejected',
        summary: err instanceof Error ? err.message : String(err),
        disclosedFields: [],
        keptPrivateFields: ['adminSecretKey', 'initialAccumulatorSalt'],
      });
      throw err;
    }
  }

  async issueVoucher(params: {
    runId: bigint;
    employeeId: string;
    amount: bigint;
    voucherSalt?: Uint8Array;
    nextAccumulatorSalt?: Uint8Array;
    recipientKeyOverride?: Uint8Array;
    callerSecretKey?: Uint8Array;
  }): Promise<EmployeeVoucherReceipt> {
    const emp = this.employees.get(params.employeeId);
    const recipientKey = params.recipientKeyOverride ?? emp?.derivedKey;
    if (!recipientKey) {
      throw new Error(`Unknown employee "${params.employeeId}"`);
    }

    const voucherSalt = params.voucherSalt ?? randomBytes32();
    const nextSalt = params.nextAccumulatorSalt ?? randomBytes32();
    const callerSk = params.callerSecretKey ?? this.admin.secretKey;

    this.sim.withPrivateState(
      createVeilPayPrivateState(callerSk, {
        runAccumulators: this.getTreasuryAccumulatorRecord(),
        pendingNextRunSalt: nextSalt,
        pendingIssue: {
          recipientKey,
          amount: params.amount,
          voucherSalt,
        },
      }),
    );

    try {
      await this.sim.call('issueVoucher', params.runId);

      const prevAcc = this.treasuryAccumulators.get(params.runId.toString());
      if (prevAcc) {
        this.treasuryAccumulators.set(params.runId.toString(), {
          total: prevAcc.total + params.amount,
          salt: nextSalt,
        });
      }

      const commitment = pureCircuits.computeVoucherCommitment(
        params.runId,
        recipientKey,
        params.amount,
        voucherSalt,
      );

      const receipt: EmployeeVoucherReceipt = {
        id: `v-${params.runId.toString()}-${this.issuedVoucherSecrets.length + 1}`,
        runId: params.runId,
        recipientId: params.employeeId,
        recipientName: emp?.name ?? params.employeeId,
        amount: params.amount,
        voucherSalt,
        commitmentHex: bytesToHex(commitment),
        claimed: false,
      };

      this.issuedVoucherSecrets.push(receipt);
      if (emp) {
        emp.vouchers.push(receipt);
      }

      this.recordLog({
        actor: 'Treasury Admin',
        circuit: 'issueVoucher',
        status: 'accepted',
        summary: `Issued shielded voucher in Run #${params.runId} (band + budget cap verified in ZK; amount & recipient HIDDEN)`,
        disclosedFields: ['issuedCount++', 'newRunningTotalCommitment (hiding)', 'voucherTree leaf (hiding)'],
        keptPrivateFields: ['employeeIdentity', 'salaryAmount', 'runningTotal', 'voucherSalt', 'accumulatorSalt'],
      });

      return receipt;
    } catch (err) {
      this.recordLog({
        actor: 'Treasury Admin',
        circuit: 'issueVoucher',
        status: 'rejected',
        summary: err instanceof Error ? err.message : String(err),
        disclosedFields: [],
        keptPrivateFields: ['employeeIdentity', 'salaryAmount', 'runningTotal', 'voucherSalt'],
      });
      throw err;
    }
  }

  async claimVoucher(params: {
    employeeId: string;
    runId: bigint;
    amount: bigint;
    voucherSalt: Uint8Array;
    callerSecretKeyOverride?: Uint8Array;
  }): Promise<{ nullifierHex: string }> {
    const emp = this.employees.get(params.employeeId);
    const callerSk = params.callerSecretKeyOverride ?? emp?.secretKey;
    if (!callerSk) {
      throw new Error(`Unknown employee "${params.employeeId}"`);
    }

    this.sim.withPrivateState(
      createVeilPayPrivateState(callerSk, {
        activeVoucher: {
          amount: params.amount,
          voucherSalt: params.voucherSalt,
        },
      }),
    );

    try {
      await this.sim.call('claimVoucher', params.runId);
      const nullifier = pureCircuits.deriveNullifier(
        callerSk,
        params.runId,
        params.voucherSalt,
        this.contractAddressBytes,
      );
      const nullifierHex = bytesToHex(nullifier);

      const saltHex = bytesToHex(params.voucherSalt);
      const match = this.issuedVoucherSecrets.find(
        (v) => v.runId === params.runId && bytesToHex(v.voucherSalt) === saltHex,
      );
      if (match) {
        match.claimed = true;
        match.nullifierHex = nullifierHex;
      }

      this.recordLog({
        actor: emp?.name ?? params.employeeId,
        circuit: 'claimVoucher',
        status: 'accepted',
        summary: `Claimed shielded voucher in Run #${params.runId} via HistoricMerkleTree ZK proof (nullifier ${nullifierHex.slice(0, 10)}…)`,
        disclosedFields: ['claimedCount++', 'unlinkable nullifier', 'historic Merkle root check'],
        keptPrivateFields: ['employeeSecretKey', 'employeePublicKey', 'salaryAmount', 'voucherSalt', 'claimedLeafIndex'],
      });

      return { nullifierHex };
    } catch (err) {
      this.recordLog({
        actor: emp?.name ?? params.employeeId,
        circuit: 'claimVoucher',
        status: 'rejected',
        summary: err instanceof Error ? err.message : String(err),
        disclosedFields: [],
        keptPrivateFields: ['employeeSecretKey', 'salaryAmount', 'voucherSalt'],
      });
      throw err;
    }
  }

  async proveIncomeThreshold(params: {
    employeeId: string;
    runId: bigint;
    actualAmount: bigint;
    voucherSalt: Uint8Array;
    thresholdAmount: bigint;
    verifierLabel: string;
    callerSecretKeyOverride?: Uint8Array;
  }): Promise<{ attestationIdHex: string }> {
    const emp = this.employees.get(params.employeeId);
    const callerSk = params.callerSecretKeyOverride ?? emp?.secretKey;
    if (!callerSk) {
      throw new Error(`Unknown employee "${params.employeeId}"`);
    }

    const verifierTag = utf8ToFixedBytes32(params.verifierLabel);
    this.sim.withPrivateState(
      createVeilPayPrivateState(callerSk, {
        activeVoucher: {
          amount: params.actualAmount,
          voucherSalt: params.voucherSalt,
        },
      }),
    );

    try {
      const { result: attestationId } = await this.sim.call(
        'proveIncomeThreshold',
        params.runId,
        params.thresholdAmount,
        verifierTag,
      );
      const attestationIdHex = bytesToHex(attestationId);

      this.recordLog({
        actor: emp?.name ?? params.employeeId,
        circuit: 'proveIncomeThreshold',
        status: 'accepted',
        summary: `Proved Run #${params.runId} salary >= $${params.thresholdAmount.toLocaleString()} for "${params.verifierLabel}" (exact salary HIDDEN)`,
        disclosedFields: ['attestationId', 'runId', `thresholdAmount=$${params.thresholdAmount}`, `verifierTag="${params.verifierLabel}"`],
        keptPrivateFields: ['exactSalary', 'employeePublicKey', 'voucherSalt', 'voucherLeaf'],
      });

      return { attestationIdHex };
    } catch (err) {
      this.recordLog({
        actor: emp?.name ?? params.employeeId,
        circuit: 'proveIncomeThreshold',
        status: 'rejected',
        summary: err instanceof Error ? err.message : String(err),
        disclosedFields: [],
        keptPrivateFields: ['exactSalary', 'employeeSecretKey', 'voucherSalt'],
      });
      throw err;
    }
  }

  async finalizeRun(
    runId: bigint,
    callerSecretKey: Uint8Array = this.admin.secretKey,
  ): Promise<void> {
    this.sim.withPrivateState(createVeilPayPrivateState(callerSecretKey));
    try {
      await this.sim.call('finalizeRun', runId);
      this.recordLog({
        actor: 'Treasury Admin',
        circuit: 'finalizeRun',
        status: 'accepted',
        summary: `Finalized Run #${runId} (no further vouchers can be issued; employees may still claim & prove income)`,
        disclosedFields: [`run #${runId} status = Finalized`],
        keptPrivateFields: ['adminSecretKey', 'individualSalaries', 'runningTotal'],
      });
    } catch (err) {
      this.recordLog({
        actor: 'Treasury Admin',
        circuit: 'finalizeRun',
        status: 'rejected',
        summary: err instanceof Error ? err.message : String(err),
        disclosedFields: [],
        keptPrivateFields: ['adminSecretKey'],
      });
      throw err;
    }
  }

  async discloseRunTotal(params: {
    runId: bigint;
    actor?: 'auditor' | 'admin';
    callerSecretKeyOverride?: Uint8Array;
    overrideOpening?: RunAccumulatorSecret;
  }): Promise<bigint> {
    const actor = params.actor ?? 'auditor';
    const callerSk =
      params.callerSecretKeyOverride ??
      (actor === 'auditor' ? this.auditor.secretKey : this.admin.secretKey);

    const accumulators = this.getTreasuryAccumulatorRecord();
    if (params.overrideOpening) {
      accumulators[params.runId.toString()] = params.overrideOpening;
    }

    this.sim.withPrivateState(
      createVeilPayPrivateState(callerSk, {
        runAccumulators: accumulators,
      }),
    );

    try {
      await this.sim.call('discloseRunTotal', params.runId);
      const auditedTotal = this.sim.ledger().auditedTotals.lookup(params.runId);
      this.recordLog({
        actor: actor === 'auditor' ? 'Compliance Auditor' : 'Treasury Admin',
        circuit: 'discloseRunTotal',
        status: 'accepted',
        summary: `Selectively disclosed Run #${params.runId} aggregate spend ($${auditedTotal.toLocaleString()}) — individual salaries remain 100% hidden`,
        disclosedFields: [`auditedTotal=$${auditedTotal}`, `run #${params.runId} status = Audited`],
        keptPrivateFields: ['auditorSecretKey', 'accumulatorSalt', 'individualSalaries', 'employeeIdentities'],
      });
      return auditedTotal;
    } catch (err) {
      this.recordLog({
        actor: actor === 'auditor' ? 'Compliance Auditor' : 'Treasury Admin',
        circuit: 'discloseRunTotal',
        status: 'rejected',
        summary: err instanceof Error ? err.message : String(err),
        disclosedFields: [],
        keptPrivateFields: ['auditorSecretKey', 'accumulatorSalt'],
      });
      throw err;
    }
  }

  getPublicSnapshot(): PublicLedgerSnapshot {
    const l = this.sim.ledger();
    const runs: PublicLedgerSnapshot['runs'] = [];
    for (const [runId, run] of l.payrollRuns) {
      const commitHex = bytesToHex(l.runningTotalCommitments.lookup(runId));
      const auditedTotal = l.auditedTotals.member(runId)
        ? l.auditedTotals.lookup(runId)
        : null;
      runs.push({
        runId,
        run,
        runningTotalCommitmentHex: commitHex,
        auditedTotal,
      });
    }
    runs.sort((a, b) => Number(a.runId - b.runId));

    const claimedNullifiers: string[] = [];
    for (const n of l.claimedNullifiers) {
      claimedNullifiers.push(bytesToHex(n));
    }

    const attestations: PublicLedgerSnapshot['attestations'] = [];
    for (const [attestationId, attestation] of l.incomeAttestations) {
      attestations.push({
        attestationIdHex: bytesToHex(attestationId),
        attestation,
      });
    }

    return {
      contractAddress: this.sim.address,
      organizationIdHex: bytesToHex(l.organizationId),
      treasuryAdminHex: bytesToHex(l.treasuryAdmin),
      complianceAuditorHex: bytesToHex(l.complianceAuditor),
      runCount: l.runCount,
      voucherTreeSize: l.voucherTree.firstFree(),
      voucherTreeRootHex: l.voucherTree.root().field.toString(16).padStart(64, '0'),
      claimedNullifiers,
      runs,
      attestations,
    };
  }

  /**
   * Runs a live byte-level + scalar privacy leak audit across the entire decoded
   * public Midnight ledger against every known secret in all local vaults.
   */
  runLivePrivacyAudit(): PrivacyAuditReport {
    const secretBytes: Record<string, Uint8Array> = {
      'admin.secretKey': this.admin.secretKey,
      'auditor.secretKey': this.auditor.secretKey,
    };
    const forbiddenScalars: Record<string, bigint> = {};

    for (const emp of this.employees.values()) {
      secretBytes[`employee(${emp.id}).secretKey`] = emp.secretKey;
      secretBytes[`employee(${emp.id}).derivedKey`] = emp.derivedKey;
    }

    for (const [runId, acc] of this.treasuryAccumulators.entries()) {
      secretBytes[`run(${runId}).accumulatorSalt`] = acc.salt;
    }

    const l = this.sim.ledger();
    for (const v of this.issuedVoucherSecrets) {
      secretBytes[`voucher(${v.id}).salt`] = v.voucherSalt;
      // Only flag individual salaries as forbidden scalars when they don't
      // accidentally collide with public bounds or a single-voucher audited total.
      const run = l.payrollRuns.lookup(v.runId);
      const isPublicBound =
        v.amount === run.budgetCap ||
        v.amount === run.minAllocation ||
        v.amount === run.maxAllocation;
      const isSingleVoucherAuditedTotal =
        run.issuedCount === 1n &&
        l.auditedTotals.member(v.runId) &&
        l.auditedTotals.lookup(v.runId) === v.amount;
      if (!isPublicBound && !isSingleVoucherAuditedTotal) {
        forbiddenScalars[`voucher(${v.id}).salary`] = v.amount;
      }
    }

    return auditPublicLedgerPrivacy(l, secretBytes, forbiddenScalars);
  }
}

export { RunStatus };

/**
 * Computes a salary amount that is guaranteed to violate either the hidden
 * cumulative `budgetCap` (when remaining headroom + 500 sits within the salary
 * band) or the public `maxAllocation` upper band on any open payroll run.
 */
export function computeAdversarialRejectAmount(
  run: Pick<PayrollRun, 'budgetCap' | 'minAllocation' | 'maxAllocation'>,
  spent: bigint,
): bigint {
  const remaining = run.budgetCap > spent ? run.budgetCap - spent : 0n;
  const capOverflow = remaining + 500n;
  if (capOverflow >= run.minAllocation && capOverflow <= run.maxAllocation) {
    return capOverflow;
  }
  return run.maxAllocation + 1n;
}

