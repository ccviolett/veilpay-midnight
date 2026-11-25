// SPDX-License-Identifier: Apache-2.0
// TypeScript witness implementations for VeilPay's local private state.
// Uses Web Crypto (globalThis.crypto) so the exact same compiled contract &
// witnesses execute cleanly in both Node.js (Vitest) and browser (Vite + WASM).

import type { WitnessContext } from '@midnight-ntwrk/compact-runtime';
import {
  type Ledger,
  type Witnesses,
} from './managed/veilpay/contract/index.js';

export interface RunAccumulatorSecret {
  readonly total: bigint;
  readonly salt: Uint8Array;
}

export interface PendingIssueSecret {
  readonly recipientKey: Uint8Array;
  readonly amount: bigint;
  readonly voucherSalt: Uint8Array;
}

export interface ClaimVoucherSecret {
  readonly amount: bigint;
  readonly voucherSalt: Uint8Array;
}

/**
 * Local private state held strictly on a participant's device (never sent to
 * the Midnight public ledger).
 */
export interface VeilPayPrivateState {
  readonly secretKey: Uint8Array;
  /** Treasury / Auditor local cumulative spend openings per runId. */
  readonly runAccumulators: Readonly<Record<string, RunAccumulatorSecret>>;
  /** Pending fresh salt to use on the next createPayrollRun / issueVoucher call. */
  readonly pendingNextRunSalt?: Uint8Array;
  /** Pending voucher issuance payload (treasury admin only). */
  readonly pendingIssue?: PendingIssueSecret;
  /** Active voucher secret being claimed or proved (employee only). */
  readonly activeVoucher?: ClaimVoucherSecret;
}

export function createVeilPayPrivateState(
  secretKey: Uint8Array,
  overrides: Partial<Omit<VeilPayPrivateState, 'secretKey'>> = {},
): VeilPayPrivateState {
  if (secretKey.length !== 32) {
    throw new Error(`secretKey must be exactly 32 bytes (received ${secretKey.length})`);
  }
  return {
    secretKey,
    runAccumulators: overrides.runAccumulators ?? {},
    pendingNextRunSalt: overrides.pendingNextRunSalt,
    pendingIssue: overrides.pendingIssue,
    activeVoucher: overrides.activeVoucher,
  };
}

export const witnesses: Witnesses<VeilPayPrivateState> = {
  localSecretKey: ({ privateState }) => [privateState, privateState.secretKey],

  getAccumulatorOpening: ({ privateState }, runId) => {
    const opening = privateState.runAccumulators[runId.toString()];
    if (!opening) {
      throw new Error(`Missing local accumulator opening for payroll run #${runId.toString()}`);
    }
    return [privateState, [opening.total, opening.salt]];
  },

  nextRunSalt: ({ privateState }) => {
    if (!privateState.pendingNextRunSalt) {
      throw new Error('Missing pendingNextRunSalt in local private state');
    }
    return [privateState, privateState.pendingNextRunSalt];
  },

  getIssueVoucherSecret: ({ privateState }) => {
    if (!privateState.pendingIssue) {
      throw new Error('Missing pendingIssue secret in local private state');
    }
    const { recipientKey, amount, voucherSalt } = privateState.pendingIssue;
    return [privateState, [recipientKey, amount, voucherSalt]];
  },

  getClaimVoucherSecret: ({ privateState }) => {
    if (!privateState.activeVoucher) {
      throw new Error('Missing activeVoucher secret in employee local private state');
    }
    const { amount, voucherSalt } = privateState.activeVoucher;
    return [privateState, [amount, voucherSalt]];
  },

  getVoucherPath: ({ privateState, ledger }, commitment) => {
    const path = ledger.voucherTree.findPathForLeaf(commitment);
    if (path === undefined) {
      throw new Error('Voucher commitment not found in on-chain payroll HistoricMerkleTree');
    }
    return [privateState, path];
  },
};

export type { Ledger, Witnesses, WitnessContext };
