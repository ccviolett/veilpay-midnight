// SPDX-License-Identifier: Apache-2.0
// Real Midnight Lace DApp Connector API v4 integration (@midnight-ntwrk/dapp-connector-api).
// Detects injected `window.midnight?.mnLace` (and any other Midnight wallet provider),
// connects to the selected Midnight network, and queries shielded/unshielded/Dust telemetry.

import type {
  ConnectedAPI,
  InitialAPI,
} from '@midnight-ntwrk/dapp-connector-api';

export type MidnightNetworkId = 'preprod' | 'preview' | 'undeployed' | 'mainnet';

export interface DetectedWallet {
  readonly id: string;
  readonly name: string;
  readonly apiVersion: string;
  readonly rdns: string;
  readonly icon: string;
  readonly api: InitialAPI;
}

export interface ConnectedLaceSession {
  readonly walletId: string;
  readonly walletName: string;
  readonly apiVersion: string;
  readonly networkId: MidnightNetworkId;
  readonly shieldedAddress: string;
  readonly unshieldedAddress: string;
  readonly dustAddress: string;
  readonly dustBalance: bigint;
  readonly dustCap: bigint;
  readonly shieldedBalances: Record<string, bigint>;
  readonly unshieldedBalances: Record<string, bigint>;
  readonly connectedApi: ConnectedAPI;
}

declare global {
  interface Window {
    midnight?: Record<string, InitialAPI | undefined>;
  }
}

export function detectMidnightWallets(): DetectedWallet[] {
  if (typeof window === 'undefined' || !window.midnight) {
    return [];
  }
  const wallets: DetectedWallet[] = [];
  for (const [id, candidate] of Object.entries(window.midnight)) {
    if (
      candidate &&
      typeof candidate === 'object' &&
      typeof candidate.connect === 'function' &&
      typeof candidate.name === 'string'
    ) {
      wallets.push({
        id,
        name: candidate.name,
        apiVersion: candidate.apiVersion ?? 'unknown',
        rdns: candidate.rdns ?? id,
        icon: candidate.icon ?? '',
        api: candidate,
      });
    }
  }
  // Prefer official Midnight Lace (`mnLace`) first when present.
  return wallets.sort((a, b) => (a.id === 'mnLace' ? -1 : b.id === 'mnLace' ? 1 : 0));
}

export async function connectMidnightWallet(
  wallet: DetectedWallet,
  networkId: MidnightNetworkId = 'preprod',
): Promise<ConnectedLaceSession> {
  const connectedApi = await wallet.api.connect(networkId);

  const [
    shieldedAddr,
    unshieldedAddr,
    dustAddr,
    dustBal,
    shieldedBalances,
    unshieldedBalances,
  ] = await Promise.all([
    connectedApi.getShieldedAddresses(),
    connectedApi.getUnshieldedAddress(),
    connectedApi.getDustAddress(),
    connectedApi.getDustBalance(),
    connectedApi.getShieldedBalances(),
    connectedApi.getUnshieldedBalances(),
  ]);

  return {
    walletId: wallet.id,
    walletName: wallet.name,
    apiVersion: wallet.apiVersion,
    networkId,
    shieldedAddress: shieldedAddr.shieldedAddress,
    unshieldedAddress: unshieldedAddr.unshieldedAddress,
    dustAddress: dustAddr.dustAddress,
    dustBalance: dustBal.balance,
    dustCap: dustBal.cap,
    shieldedBalances,
    unshieldedBalances,
    connectedApi,
  };
}
