// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import { Wallet, CheckCircle2, AlertTriangle, RefreshCw, X } from 'lucide-react';
import {
  connectMidnightWallet,
  detectMidnightWallets,
  type ConnectedLaceSession,
  type DetectedWallet,
  type MidnightNetworkId,
} from '../midnight/lace.ts';

interface LaceWalletModalProps {
  open: boolean;
  onClose: () => void;
  session: ConnectedLaceSession | null;
  onConnected: (session: ConnectedLaceSession) => void;
  onDisconnected: () => void;
}

export function LaceWalletModal({
  open,
  onClose,
  session,
  onConnected,
  onDisconnected,
}: LaceWalletModalProps) {
  const [wallets, setWallets] = useState<DetectedWallet[]>([]);
  const [networkId, setNetworkId] = useState<MidnightNetworkId>('preprod');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = () => {
    setError(null);
    setWallets(detectMidnightWallets());
  };

  useEffect(() => {
    if (open) scan();
  }, [open]);

  if (!open) return null;

  const handleConnect = async (wallet: DetectedWallet) => {
    setConnecting(true);
    setError(null);
    try {
      const next = await connectMidnightWallet(wallet, networkId);
      onConnected(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header" style={{ marginBottom: 14 }}>
          <h2 className="panel-title">
            <Wallet size={18} /> Midnight Lace Wallet (DApp Connector API v4)
          </h2>
          <button className="btn btn-sm" onClick={onClose} aria-label="Close">
            <X size={14} />
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 0 }}>
          Connect an injected Midnight wallet (<code className="mono">window.midnight.mnLace</code>)
          via <code className="mono">@midnight-ntwrk/dapp-connector-api@4.1.0</code>. You can always
          execute all compiled Compact circuits immediately in-browser via the Local Compact Runtime
          without needing testnet tokens.
        </p>

        <div className="field" style={{ marginBottom: 14 }}>
          <label>Target Midnight Network</label>
          <select
            value={networkId}
            onChange={(e) => setNetworkId(e.target.value as MidnightNetworkId)}
          >
            <option value="preprod">preprod (Midnight Preprod Testnet)</option>
            <option value="preview">preview (Midnight Preview Testnet)</option>
            <option value="undeployed">undeployed (Local Midnight Dev Node)</option>
            <option value="mainnet">mainnet (Midnight Mainnet)</option>
          </select>
        </div>

        {session ? (
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <CheckCircle2 size={16} color="#10b981" />
              <strong>
                Connected to {session.walletName} (API {session.apiVersion} · {session.networkId})
              </strong>
            </div>
            <div className="hash-line mono">
              <span>Shielded Address</span>
              <span>{session.shieldedAddress.slice(0, 26)}…</span>
            </div>
            <div className="hash-line mono">
              <span>Unshielded Address</span>
              <span>{session.unshieldedAddress.slice(0, 26)}…</span>
            </div>
            <div className="hash-line mono">
              <span>Dust Balance / Cap</span>
              <span>
                {session.dustBalance.toString()} / {session.dustCap.toString()}
              </span>
            </div>
            <div className="btn-row">
              <button className="btn btn-danger btn-sm" onClick={onDisconnected}>
                Disconnect Wallet
              </button>
            </div>
          </div>
        ) : wallets.length > 0 ? (
          <div className="section-card">
            <h3>Detected Injected Midnight Wallets ({wallets.length})</h3>
            {wallets.map((w) => (
              <div
                key={w.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>{w.name}</div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    window.midnight.{w.id} · v{w.apiVersion}
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={connecting}
                  onClick={() => handleConnect(w)}
                >
                  {connecting ? 'Authorizing…' : `Connect (${networkId})`}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="section-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <AlertTriangle size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 4 }}>
                  No Midnight Lace extension detected in this browser
                </strong>
                Install the official Midnight Lace browser extension to connect a Preprod/Preview
                wallet, or close this dialog to continue executing the real compiled{' '}
                <code className="mono">veilpay.compact</code> circuits directly inside the in-browser
                Compact Runtime (WASM).
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-sm" onClick={scan}>
                <RefreshCw size={13} /> Re-scan window.midnight
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="toast toast-error" style={{ marginTop: 12, marginBottom: 0 }}>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
