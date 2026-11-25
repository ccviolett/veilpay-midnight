import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type SecretKey = Uint8Array;

export type AdminPublicKey = Uint8Array;

export type EmployeePublicKey = Uint8Array;

export type Nullifier = Uint8Array;

export type AttestationId = Uint8Array;

export enum RunStatus { Open = 0, Finalized = 1, Audited = 2 }

export type PayrollRun = { budgetCap: bigint;
                           minAllocation: bigint;
                           maxAllocation: bigint;
                           expectedHeadcount: bigint;
                           issuedCount: bigint;
                           claimedCount: bigint;
                           status: RunStatus
                         };

export type IncomeAttestation = { runId: bigint;
                                  thresholdAmount: bigint;
                                  verifierTag: Uint8Array
                                };

export type Witnesses<PS> = {
  localSecretKey(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, SecretKey];
  getAccumulatorOpening(context: __compactRuntime.WitnessContext<Ledger, PS>,
                        runId_0: bigint): [PS, [bigint, Uint8Array]];
  nextRunSalt(context: __compactRuntime.WitnessContext<Ledger, PS>,
              runId_0: bigint): [PS, Uint8Array];
  getIssueVoucherSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, [Uint8Array,
                                                                                     bigint,
                                                                                     Uint8Array]];
  getClaimVoucherSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, [bigint,
                                                                                     Uint8Array]];
  getVoucherPath(context: __compactRuntime.WitnessContext<Ledger, PS>,
                 commitment_0: Uint8Array): [PS, { leaf: Uint8Array,
                                                   path: { sibling: { field: bigint
                                                                    },
                                                           goes_left: boolean
                                                         }[]
                                                 }];
}

export type ImpureCircuits<PS> = {
  rotateAdmin(context: __compactRuntime.CircuitContext<PS>,
              newAdminKey_0: AdminPublicKey): Promise<__compactRuntime.CircuitResults<PS, []>>;
  setComplianceAuditor(context: __compactRuntime.CircuitContext<PS>,
                       newAuditorKey_0: AdminPublicKey): Promise<__compactRuntime.CircuitResults<PS, []>>;
  createPayrollRun(context: __compactRuntime.CircuitContext<PS>,
                   budgetCap_0: bigint,
                   minAllocation_0: bigint,
                   maxAllocation_0: bigint,
                   expectedHeadcount_0: bigint): Promise<__compactRuntime.CircuitResults<PS, bigint>>;
  issueVoucher(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  claimVoucher(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  proveIncomeThreshold(context: __compactRuntime.CircuitContext<PS>,
                       runId_0: bigint,
                       thresholdAmount_0: bigint,
                       verifierTag_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, AttestationId>>;
  finalizeRun(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  discloseRunTotal(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type ProvableCircuits<PS> = {
  rotateAdmin(context: __compactRuntime.CircuitContext<PS>,
              newAdminKey_0: AdminPublicKey): Promise<__compactRuntime.CircuitResults<PS, []>>;
  setComplianceAuditor(context: __compactRuntime.CircuitContext<PS>,
                       newAuditorKey_0: AdminPublicKey): Promise<__compactRuntime.CircuitResults<PS, []>>;
  createPayrollRun(context: __compactRuntime.CircuitContext<PS>,
                   budgetCap_0: bigint,
                   minAllocation_0: bigint,
                   maxAllocation_0: bigint,
                   expectedHeadcount_0: bigint): Promise<__compactRuntime.CircuitResults<PS, bigint>>;
  issueVoucher(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  claimVoucher(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  proveIncomeThreshold(context: __compactRuntime.CircuitContext<PS>,
                       runId_0: bigint,
                       thresholdAmount_0: bigint,
                       verifierTag_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, AttestationId>>;
  finalizeRun(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  discloseRunTotal(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type PureCircuits = {
  deriveAdminKey(sk_0: Uint8Array, orgId_0: Uint8Array): Uint8Array;
  deriveAuditorKey(sk_0: Uint8Array, orgId_0: Uint8Array): Uint8Array;
  deriveEmployeeKey(sk_0: Uint8Array, instance_0: Uint8Array): Uint8Array;
  computeTotalCommitment(total_0: bigint, salt_0: Uint8Array): Uint8Array;
  computeVoucherCommitment(runId_0: bigint,
                           recipientKey_0: Uint8Array,
                           amount_0: bigint,
                           salt_0: Uint8Array): Uint8Array;
  deriveNullifier(sk_0: Uint8Array,
                  runId_0: bigint,
                  salt_0: Uint8Array,
                  instance_0: Uint8Array): Uint8Array;
  deriveAttestationId(employeeKey_0: Uint8Array,
                      runId_0: bigint,
                      verifierTag_0: Uint8Array,
                      thresholdAmount_0: bigint,
                      instance_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  deriveAdminKey(context: __compactRuntime.CircuitContext<PS>,
                 sk_0: Uint8Array,
                 orgId_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  deriveAuditorKey(context: __compactRuntime.CircuitContext<PS>,
                   sk_0: Uint8Array,
                   orgId_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  deriveEmployeeKey(context: __compactRuntime.CircuitContext<PS>,
                    sk_0: Uint8Array,
                    instance_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  computeTotalCommitment(context: __compactRuntime.CircuitContext<PS>,
                         total_0: bigint,
                         salt_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  computeVoucherCommitment(context: __compactRuntime.CircuitContext<PS>,
                           runId_0: bigint,
                           recipientKey_0: Uint8Array,
                           amount_0: bigint,
                           salt_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  deriveNullifier(context: __compactRuntime.CircuitContext<PS>,
                  sk_0: Uint8Array,
                  runId_0: bigint,
                  salt_0: Uint8Array,
                  instance_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  deriveAttestationId(context: __compactRuntime.CircuitContext<PS>,
                      employeeKey_0: Uint8Array,
                      runId_0: bigint,
                      verifierTag_0: Uint8Array,
                      thresholdAmount_0: bigint,
                      instance_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  rotateAdmin(context: __compactRuntime.CircuitContext<PS>,
              newAdminKey_0: AdminPublicKey): Promise<__compactRuntime.CircuitResults<PS, []>>;
  setComplianceAuditor(context: __compactRuntime.CircuitContext<PS>,
                       newAuditorKey_0: AdminPublicKey): Promise<__compactRuntime.CircuitResults<PS, []>>;
  createPayrollRun(context: __compactRuntime.CircuitContext<PS>,
                   budgetCap_0: bigint,
                   minAllocation_0: bigint,
                   maxAllocation_0: bigint,
                   expectedHeadcount_0: bigint): Promise<__compactRuntime.CircuitResults<PS, bigint>>;
  issueVoucher(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  claimVoucher(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  proveIncomeThreshold(context: __compactRuntime.CircuitContext<PS>,
                       runId_0: bigint,
                       thresholdAmount_0: bigint,
                       verifierTag_0: Uint8Array): Promise<__compactRuntime.CircuitResults<PS, AttestationId>>;
  finalizeRun(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  discloseRunTotal(context: __compactRuntime.CircuitContext<PS>, runId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type Ledger = {
  readonly organizationId: Uint8Array;
  readonly treasuryAdmin: AdminPublicKey;
  readonly complianceAuditor: AdminPublicKey;
  readonly runCount: bigint;
  payrollRuns: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): PayrollRun;
    [Symbol.iterator](): Iterator<[bigint, PayrollRun]>
  };
  runningTotalCommitments: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Uint8Array;
    [Symbol.iterator](): Iterator<[bigint, Uint8Array]>
  };
  auditedTotals: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  voucherTree: {
    isFull(): boolean;
    checkRoot(rt_0: { field: bigint }): boolean;
    root(): __compactRuntime.MerkleTreeDigest;
    firstFree(): bigint;
    pathForLeaf(index_0: bigint, leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array>;
    findPathForLeaf(leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array> | undefined;
    history(): Iterator<__compactRuntime.MerkleTreeDigest>
  };
  claimedNullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Nullifier): boolean;
    [Symbol.iterator](): Iterator<Nullifier>
  };
  incomeAttestations: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: AttestationId): boolean;
    lookup(key_0: AttestationId): IncomeAttestation;
    [Symbol.iterator](): Iterator<[AttestationId, IncomeAttestation]>
  };
}

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               orgId_0: Uint8Array): Promise<__compactRuntime.ConstructorResult<PS>>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
export declare const expectedVk: Record<string, string>;
export declare const circuitSignatures: __compactRuntime.CircuitSignatures;
export declare const declaredInterfaces: __compactRuntime.DeclaredInterfaces;
