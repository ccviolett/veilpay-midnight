// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Globe,
  UserCheck,
  Building2,
  FileSearch,
  Wallet,
  Sparkles,
  RotateCcw,
  KeyRound,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Send,
  BadgeCheck,
  Layers,
} from 'lucide-react';
import {
  RunStatus,
  VeilPayEngine,
  computeAdversarialRejectAmount,
  type PublicLedgerSnapshot,
} from './midnight/engine.ts';
import { bytesToHex, type PrivacyAuditReport } from './midnight/privacy.ts';
import type { ConnectedLaceSession } from './midnight/lace.ts';
import { LaceWalletModal } from './components/LaceWalletModal.tsx';

type PersonaId = 'admin' | 'alice' | 'bob' | 'charlie' | 'auditor';

const RUN_STATUS_LABEL: Record<RunStatus, { label: string; cls: string }> = {
  [RunStatus.Open]: { label: 'OPEN', cls: 'badge-emerald' },
  [RunStatus.Finalized]: { label: 'FINALIZED', cls: 'badge-amber' },
  [RunStatus.Audited]: { label: 'AUDITED', cls: 'badge-cyan' },
};

function shortHex(hex: string, lead = 10, tail = 8): string {
  if (hex.length <= lead + tail + 2) return `0x${hex}`;
  return `0x${hex.slice(0, lead)}…${hex.slice(-tail)}`;
}

function decodeLabel(bytes: Uint8Array): string {
  const end = bytes.indexOf(0);
  const slice = end === -1 ? bytes : bytes.subarray(0, end);
  return new TextDecoder().decode(slice) || shortHex(bytesToHex(bytes));
}

export default function App() {
  const [engine, setEngine] = useState<VeilPayEngine | null>(null);
  const [snapshot, setSnapshot] = useState<PublicLedgerSnapshot | null>(null);
  const [privacyReport, setPrivacyReport] = useState<PrivacyAuditReport | null>(null);
  const [activeRole, setActiveRole] = useState<PersonaId>('admin');
  const [busy, setBusy] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [toast, setToast] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [laceSession, setLaceSession] = useState<ConnectedLaceSession | null>(null);

  // Admin Create Run form state
  const [budgetCap, setBudgetCap] = useState('35000');
  const [minAlloc, setMinAlloc] = useState('4000');
  const [maxAlloc, setMaxAlloc] = useState('18000');
  const [headcount, setHeadcount] = useState('3');

  // Admin Issue Voucher form state
  const [selectedRunId, setSelectedRunId] = useState('1');
  const [selectedEmpId, setSelectedEmpId] = useState('alice');
  const [salaryAmount, setSalaryAmount] = useState('12750');

  // Employee selective disclosure form state
  const [thresholdInput, setThresholdInput] = useState('10000');
  const [verifierLabel, setVerifierLabel] = useState('MetroBank-Mortgage-2026');

  const syncView = useCallback((eng: VeilPayEngine) => {
    const nextSnap = eng.getPublicSnapshot();
    setSnapshot(nextSnap);
    setPrivacyReport(eng.runLivePrivacyAudit());
    if (nextSnap.runs.length > 0) {
      const latestOpen = [...nextSnap.runs]
        .reverse()
        .find((r) => r.run.status === RunStatus.Open);
      if (latestOpen) {
        setSelectedRunId(latestOpen.runId.toString());
      }
    }
  }, []);

  const initVault = useCallback(async () => {
    setBusy(true);
    setToast(null);
    try {
      const next = await VeilPayEngine.create({
        organizationLabel: 'AcmeShield Labs DAO',
      });
      setEngine(next);
      syncView(next);
    } catch (err) {
      setToast({
        kind: 'error',
        text: `Failed to boot Midnight Compact Runtime: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setBusy(false);
    }
  }, [syncView]);

  useEffect(() => {
    void initVault();
  }, [initVault]);

  const runAction = async (label: string, fn: (eng: VeilPayEngine) => Promise<void>) => {
    if (!engine) return;
    setBusy(true);
    setToast(null);
    try {
      await fn(engine);
      syncView(engine);
      setToast({ kind: 'success', text: label });
    } catch (err) {
      syncView(engine);
      setToast({
        kind: 'error',
        text: `Circuit Rejected: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setBusy(false);
    }
  };

  const loadDemoScenario = async () => {
    setBusy(true);
    setToast(null);
    try {
      const fresh = await VeilPayEngine.create({
        organizationLabel: 'AcmeShield Labs DAO',
      });
      const runId = await fresh.createPayrollRun({
        budgetCap: 35_000n,
        minAllocation: 4_000n,
        maxAllocation: 18_000n,
        expectedHeadcount: 4n,
      });
      await fresh.issueVoucher({ runId, employeeId: 'alice', amount: 12_750n });
      await fresh.issueVoucher({ runId, employeeId: 'bob', amount: 9_400n });
      await fresh.issueVoucher({ runId, employeeId: 'charlie', amount: 6_850n });
      setEngine(fresh);
      syncView(fresh);
      setActiveRole('alice');
      setToast({
        kind: 'success',
        text: 'Loaded Q4 Demo Payroll (Run #1: 3/4 shielded vouchers issued, $29,000 hidden spend under $35,000 cap). Switched to Alice Chen — try claiming her voucher, proving income >= $10,000, or testing budget-cap rejection in Treasury Admin!',
      });
    } catch (err) {
      setToast({
        kind: 'error',
        text: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
    }
  };

  if (!engine || !snapshot || !privacyReport) {
    return (
      <div className="app-shell">
        <div className="panel" style={{ textAlign: 'center', padding: 48 }}>
          <Sparkles size={28} color="#7c6eff" />
          <h2>Initializing Midnight Compact Runtime (WASM)…</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Deploying compiled <code className="mono">veilpay.compact</code> contract into local
            in-browser simulator.
          </p>
        </div>
      </div>
    );
  }

  const activeEmployee =
    activeRole === 'alice' || activeRole === 'bob' || activeRole === 'charlie'
      ? engine.employees.get(activeRole) ?? null
      : null;

  const activeVault =
    activeRole === 'admin'
      ? engine.admin
      : activeRole === 'auditor'
        ? engine.auditor
        : activeEmployee!;

  const openRuns = snapshot.runs.filter((r) => r.run.status === RunStatus.Open);

  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1>VeilPay · Midnight Shielded Payroll & Compliance Vault</h1>
            <p>
              Dual-Ledger ZK Payroll · Compact 0.28 ·{' '}
              <span className="mono">@midnight-ntwrk/compact-runtime@0.21.0</span>
            </p>
          </div>
        </div>

        <div className="topbar-actions">
          <span className="badge badge-accent">
            <Layers size={13} /> 8 Compiled ZK Circuits
          </span>
          <button
            className="btn btn-primary btn-sm"
            disabled={busy}
            onClick={() => void loadDemoScenario()}
          >
            <Sparkles size={14} /> Load Q4 Demo
          </button>
          <button
            className="btn btn-sm"
            disabled={busy}
            onClick={() => void initVault()}
          >
            <RotateCcw size={14} /> Reset Vault
          </button>
          <button
            className={`btn btn-sm ${laceSession ? 'btn-emerald' : ''}`}
            onClick={() => setWalletModalOpen(true)}
          >
            <Wallet size={14} />
            {laceSession
              ? `${laceSession.walletName} (${laceSession.networkId})`
              : 'Connect Lace Wallet'}
          </button>
        </div>
      </header>

      {/* Live Privacy Invariant Audit Banner */}
      <div className={`audit-banner ${privacyReport.passed ? '' : 'failed'}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {privacyReport.passed ? (
            <ShieldCheck size={20} color="#10b981" />
          ) : (
            <ShieldAlert size={20} color="#f43f5e" />
          )}
          <div>
            <strong style={{ fontSize: '0.88rem' }}>
              {privacyReport.passed
                ? 'LIVE PRIVACY INVARIANT AUDIT: 0 SECRETS LEAKED ON PUBLIC LEDGER'
                : `PRIVACY LEAK DETECTED (${privacyReport.leaks.length})`}
            </strong>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Scanned {privacyReport.inspectedByteEntries} raw public byte arrays &{' '}
              {privacyReport.inspectedScalars} ledger scalars against all local secret keys,
              employee identities, individual salaries, and blinding salts.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className="badge badge-emerald">Salaries: Hidden</span>
          <span className="badge badge-emerald">Identities: Hidden</span>
          <span className="badge badge-emerald">Claim Linkability: Broken (Merkle + Nullifier)</span>
        </div>
      </div>

      {toast && (
        <div className={`toast ${toast.kind === 'success' ? 'toast-success' : 'toast-error'}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {toast.kind === 'success' ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
            <span>{toast.text}</span>
          </div>
          <button className="btn btn-sm" onClick={() => setToast(null)}>
            Dismiss
          </button>
        </div>
      )}

      {/* Participant Device Switcher */}
      <div className="role-bar" role="tablist" aria-label="Active Device Persona">
        <button
          className={`role-tab ${activeRole === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveRole('admin')}
        >
          <Building2 size={15} /> Treasury Admin
        </button>
        {(['alice', 'bob', 'charlie'] as const).map((empId) => {
          const emp = engine.employees.get(empId)!;
          const unclaimed = emp.vouchers.filter((v) => !v.claimed).length;
          return (
            <button
              key={empId}
              className={`role-tab ${activeRole === empId ? 'active' : ''}`}
              onClick={() => setActiveRole(empId)}
            >
              <UserCheck size={15} /> {emp.name.split(' (')[0]}
              {unclaimed > 0 && <span className="badge badge-emerald">{unclaimed} unclaimed</span>}
            </button>
          );
        })}
        <button
          className={`role-tab ${activeRole === 'auditor' ? 'active' : ''}`}
          onClick={() => setActiveRole('auditor')}
        >
          <FileSearch size={15} /> Compliance Auditor
        </button>
      </div>

      {/* Main Dual-Ledger Split Workspace */}
      <main className="dual-grid">
        {/* LEFT COLUMN: LOCAL PRIVATE STATE */}
        <section className="panel panel-private">
          <div className="panel-header">
            <h2 className="panel-title">
              <Lock size={18} color="#10b981" /> Local Private State — {activeVault.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-emerald">NEVER LEAVES DEVICE</span>
              <button
                className="btn btn-sm"
                onClick={() => setShowSecrets((s) => !s)}
                title="Toggle raw local secret visibility"
              >
                {showSecrets ? <EyeOff size={13} /> : <Eye size={13} />}
                {showSecrets ? 'Hide Secrets' : 'Inspect Secrets'}
              </button>
            </div>
          </div>

          {/* Device Cryptographic Identity */}
          <div className="kv-grid">
            <div className="kv-box">
              <div className="kv-label">Local Secret Key (Witness Only)</div>
              <div className="kv-value mono" style={{ color: '#6ee7b7' }}>
                {showSecrets ? shortHex(bytesToHex(activeVault.secretKey), 14, 10) : '•••••••••••••••••••••••• (32 bytes)'}
              </div>
            </div>
            <div className="kv-box">
              <div className="kv-label">
                Derived {activeVault.role === 'employee' ? 'Employee' : activeVault.role === 'admin' ? 'Admin' : 'Auditor'} Key
              </div>
              <div className="kv-value mono">{shortHex(bytesToHex(activeVault.derivedKey), 12, 8)}</div>
            </div>
          </div>

          {/* TREASURY ADMIN CONTROLS */}
          {activeRole === 'admin' && (
            <>
              <div className="section-card">
                <h3>
                  <Building2 size={15} color="#7c6eff" /> 1. Create Payroll Run (Public Governance Bounds)
                </h3>
                <div className="form-grid">
                  <div className="field">
                    <label>Budget Cap (USD)</label>
                    <input
                      type="number"
                      min="1"
                      value={budgetCap}
                      onChange={(e) => setBudgetCap(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Expected Headcount</label>
                    <input
                      type="number"
                      min="1"
                      max="1024"
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Min Salary Band (USD)</label>
                    <input
                      type="number"
                      min="1"
                      value={minAlloc}
                      onChange={(e) => setMinAlloc(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Max Salary Band (USD)</label>
                    <input
                      type="number"
                      min="1"
                      value={maxAlloc}
                      onChange={(e) => setMaxAlloc(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  disabled={busy}
                  onClick={() =>
                    void runAction('Created new shielded payroll run on Midnight ledger.', async (eng) => {
                      await eng.createPayrollRun({
                        budgetCap: BigInt(budgetCap || '0'),
                        minAllocation: BigInt(minAlloc || '0'),
                        maxAllocation: BigInt(maxAlloc || '0'),
                        expectedHeadcount: BigInt(headcount || '0'),
                      });
                    })
                  }
                >
                  <Send size={14} /> Execute createPayrollRun()
                </button>
              </div>

              <div className="section-card">
                <h3>
                  <KeyRound size={15} color="#10b981" /> 2. Issue Shielded Voucher (Private Witness)
                </h3>
                {openRuns.length === 0 ? (
                  <p className="empty-note">
                    Create an Open payroll run above (or click <strong>Load Q4 Demo</strong>) to
                    issue shielded salary vouchers.
                  </p>
                ) : (
                  <>
                    <div className="form-grid-3">
                      <div className="field">
                        <label>Payroll Run</label>
                        <select
                          value={selectedRunId}
                          onChange={(e) => setSelectedRunId(e.target.value)}
                        >
                          {openRuns.map((r) => (
                            <option key={r.runId.toString()} value={r.runId.toString()}>
                              Run #{r.runId.toString()} (cap ${r.run.budgetCap.toLocaleString()})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label>Employee (Private)</label>
                        <select
                          value={selectedEmpId}
                          onChange={(e) => setSelectedEmpId(e.target.value)}
                        >
                          {Array.from(engine.employees.values()).map((e) => (
                            <option key={e.id} value={e.id}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label>Hidden Salary (USD)</label>
                        <input
                          type="number"
                          min="1"
                          value={salaryAmount}
                          onChange={(e) => setSalaryAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="btn-row">
                      <button
                        className="btn btn-emerald"
                        disabled={busy}
                        onClick={() =>
                          void runAction(
                            `Issued shielded voucher in Run #${selectedRunId}. Salary & recipient verified in ZK and kept 100% private.`,
                            async (eng) => {
                              await eng.issueVoucher({
                                runId: BigInt(selectedRunId),
                                employeeId: selectedEmpId,
                                amount: BigInt(salaryAmount || '0'),
                              });
                            },
                          )
                        }
                      >
                        <Lock size={14} /> Execute issueVoucher()
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        disabled={busy}
                        onClick={() => {
                          const targetRun = openRuns.find(
                            (r) => r.runId.toString() === selectedRunId,
                          );
                          const acc = engine.treasuryAccumulators.get(selectedRunId);
                          const badAmount = targetRun
                            ? computeAdversarialRejectAmount(targetRun.run, acc?.total ?? 0n)
                            : 99_999n;
                          void runAction('Unexpectedly succeeded', async (eng) => {
                            await eng.issueVoucher({
                              runId: BigInt(selectedRunId),
                              employeeId: selectedEmpId,
                              amount: badAmount,
                            });
                          });
                        }}
                      >
                        Test Budget/Band Rejection
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="section-card">
                <h3>
                  <Lock size={15} color="#10b981" /> 3. Private Treasury Accumulators (Off-Chain)
                </h3>
                {snapshot.runs.length === 0 ? (
                  <p className="empty-note">No local accumulators yet.</p>
                ) : (
                  snapshot.runs.map(({ runId, run }) => {
                    const acc = engine.treasuryAccumulators.get(runId.toString());
                    const runVouchers = engine.issuedVoucherSecrets.filter(
                      (v) => v.runId === runId,
                    );
                    return (
                      <div key={runId.toString()} className="voucher-item">
                        <div className="run-card-top">
                          <strong>
                            Run #{runId.toString()} — Private Spend: $
                            {(acc?.total ?? 0n).toLocaleString()} / $
                            {run.budgetCap.toLocaleString()} cap
                          </strong>
                          {run.status === RunStatus.Open && run.issuedCount > 0n && (
                            <button
                              className="btn btn-amber btn-sm"
                              disabled={busy}
                              onClick={() =>
                                void runAction(
                                  `Finalized Run #${runId}. Issuance locked; employees can still claim & prove income.`,
                                  async (eng) => {
                                    await eng.finalizeRun(runId);
                                  },
                                )
                              }
                            >
                              Finalize Run #{runId.toString()}
                            </button>
                          )}
                        </div>
                        {acc && (
                          <div className="hash-line mono">
                            <span>Local Blinding Salt</span>
                            <span>
                              {showSecrets ? shortHex(bytesToHex(acc.salt), 12, 8) : 'hidden (32B)'}
                            </span>
                          </div>
                        )}
                        {runVouchers.length > 0 && (
                          <div style={{ marginTop: 8, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {runVouchers.map((v) => (
                              <div
                                key={v.id}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  padding: '3px 0',
                                }}
                              >
                                <span>{v.recipientName}</span>
                                <span className="mono" style={{ color: '#6ee7b7' }}>
                                  ${v.amount.toLocaleString()} ({v.claimed ? 'claimed' : 'unclaimed'})
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* EMPLOYEE CONTROLS */}
          {activeEmployee && (
            <>
              <div className="section-card">
                <h3>
                  <UserCheck size={15} color="#10b981" /> Private Vouchers Held by{' '}
                  {activeEmployee.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 0 }}>
                  This device only stores vouchers privately delivered to{' '}
                  <strong>{activeEmployee.name.split(' (')[0]}</strong>. Other employees&apos;
                  salaries are invisible here and on the Midnight public ledger.
                </p>

                {activeEmployee.vouchers.length === 0 ? (
                  <p className="empty-note">
                    No vouchers issued to {activeEmployee.name.split(' (')[0]} yet. Switch to{' '}
                    <strong>Treasury Admin</strong> or click <strong>Load Q4 Demo</strong>.
                  </p>
                ) : (
                  activeEmployee.vouchers.map((v) => (
                    <div key={v.id} className="voucher-item">
                      <div className="run-card-top">
                        <div>
                          <strong>
                            Run #{v.runId.toString()} · Hidden Salary:{' '}
                            <span style={{ color: '#6ee7b7' }}>${v.amount.toLocaleString()}</span>
                          </strong>
                        </div>
                        <span className={`badge ${v.claimed ? 'badge-cyan' : 'badge-emerald'}`}>
                          {v.claimed ? 'CLAIMED (NULLIFIER POSTED)' : 'READY TO CLAIM'}
                        </span>
                      </div>

                      <div className="hash-line mono">
                        <span>Voucher Commitment (Merkle Leaf)</span>
                        <span>{shortHex(v.commitmentHex, 12, 8)}</span>
                      </div>
                      <div className="hash-line mono">
                        <span>Private Voucher Salt</span>
                        <span>
                          {showSecrets ? shortHex(bytesToHex(v.voucherSalt), 12, 8) : 'hidden (32B)'}
                        </span>
                      </div>

                      <div className="btn-row">
                        {!v.claimed ? (
                          <button
                            className="btn btn-emerald btn-sm"
                            disabled={busy}
                            onClick={() =>
                              void runAction(
                                `Claimed voucher via unlinkable HistoricMerkleTree ZK proof! Only a fresh nullifier hit the public ledger.`,
                                async (eng) => {
                                  await eng.claimVoucher({
                                    employeeId: activeEmployee.id,
                                    runId: v.runId,
                                    amount: v.amount,
                                    voucherSalt: v.voucherSalt,
                                  });
                                },
                              )
                            }
                          >
                            <CheckCircle2 size={14} /> Claim Shielded Voucher (claimVoucher)
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger btn-sm"
                            disabled={busy}
                            onClick={() =>
                              void runAction('Unexpected replay success', async (eng) => {
                                await eng.claimVoucher({
                                  employeeId: activeEmployee.id,
                                  runId: v.runId,
                                  amount: v.amount,
                                  voucherSalt: v.voucherSalt,
                                });
                              })
                            }
                          >
                            Test Double-Claim Replay (Nullifier Reject)
                          </button>
                        )}
                      </div>

                      {/* Selective Disclosure Proof of Income */}
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: '1px solid var(--border)',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: '#fcd34d',
                            marginBottom: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <BadgeCheck size={14} /> Selective Disclosure: Prove Salary &gt;= Threshold
                        </div>
                        <div className="form-grid">
                          <div className="field">
                            <label>Min Income Threshold (USD)</label>
                            <input
                              type="number"
                              min="1"
                              value={thresholdInput}
                              onChange={(e) => setThresholdInput(e.target.value)}
                            />
                          </div>
                          <div className="field">
                            <label>Verifier Tag (Bank / Landlord)</label>
                            <input
                              type="text"
                              value={verifierLabel}
                              onChange={(e) => setVerifierLabel(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="btn-row">
                          <button
                            className="btn btn-amber btn-sm"
                            disabled={busy}
                            onClick={() =>
                              void runAction(
                                `Published ZK income attestation proving salary >= $${BigInt(thresholdInput || '0').toLocaleString()} for "${verifierLabel}" without exposing exact salary ($${v.amount.toLocaleString()})!`,
                                async (eng) => {
                                  await eng.proveIncomeThreshold({
                                    employeeId: activeEmployee.id,
                                    runId: v.runId,
                                    actualAmount: v.amount,
                                    voucherSalt: v.voucherSalt,
                                    thresholdAmount: BigInt(thresholdInput || '0'),
                                    verifierLabel: verifierLabel.trim() || 'Verifier-2026',
                                  });
                                },
                              )
                            }
                          >
                            <BadgeCheck size={14} /> Generate ZK Income Proof
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            disabled={busy}
                            onClick={() =>
                              void runAction('Unexpected false proof', async (eng) => {
                                await eng.proveIncomeThreshold({
                                  employeeId: activeEmployee.id,
                                  runId: v.runId,
                                  actualAmount: v.amount,
                                  voucherSalt: v.voucherSalt,
                                  thresholdAmount: v.amount + 5_000n,
                                  verifierLabel: 'Overstated-Claim-Test',
                                });
                              })
                            }
                          >
                            Test False Threshold (+$5k Reject)
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* COMPLIANCE AUDITOR CONTROLS */}
          {activeRole === 'auditor' && (
            <div className="section-card">
              <h3>
                <FileSearch size={15} color="#38bdf8" /> Selective Aggregate Audit (discloseRunTotal)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 0 }}>
                After Treasury finalizes a payroll run, the authorized Compliance Auditor can open
                the hidden cumulative spend commitment to disclose <strong>ONLY the aggregate total</strong>{' '}
                to regulators/DAO stakeholders—while individual employee salaries remain 100%
                private.
              </p>

              {snapshot.runs.length === 0 ? (
                <p className="empty-note">No payroll runs exist yet.</p>
              ) : (
                snapshot.runs.map(({ runId, run, auditedTotal }) => {
                  const acc = engine.treasuryAccumulators.get(runId.toString());
                  return (
                    <div key={runId.toString()} className="voucher-item">
                      <div className="run-card-top">
                        <strong>Run #{runId.toString()}</strong>
                        <span className={`badge ${RUN_STATUS_LABEL[run.status].cls}`}>
                          {RUN_STATUS_LABEL[run.status].label}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Committed Private Total:{' '}
                        <strong className="mono" style={{ color: '#6ee7b7' }}>
                          ${(acc?.total ?? 0n).toLocaleString()}
                        </strong>{' '}
                        (Cap: ${run.budgetCap.toLocaleString()})
                      </div>
                      {run.status === RunStatus.Open && (
                        <div className="empty-note">
                          Finalize Run #{runId.toString()} in <strong>Treasury Admin</strong> first
                          to enable selective aggregate audit.
                        </div>
                      )}
                      {run.status === RunStatus.Finalized && (
                        <div className="btn-row">
                          <button
                            className="btn btn-primary btn-sm"
                            disabled={busy}
                            onClick={() =>
                              void runAction(
                                `Selectively disclosed Run #${runId} aggregate spend! Individual salaries remain 100% shielded.`,
                                async (eng) => {
                                  await eng.discloseRunTotal({ runId, actor: 'auditor' });
                                },
                              )
                            }
                          >
                            <FileSearch size={14} /> Verify & Disclose Aggregate Total
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            disabled={busy}
                            onClick={() =>
                              void runAction('Unexpected tampered audit', async (eng) => {
                                await eng.discloseRunTotal({
                                  runId,
                                  actor: 'auditor',
                                  overrideOpening: {
                                    total: (acc?.total ?? 100n) - 1n,
                                    salt: acc!.salt,
                                  },
                                });
                              })
                            }
                          >
                            Test Tampered Total (-$1 Reject)
                          </button>
                        </div>
                      )}
                      {run.status === RunStatus.Audited && auditedTotal !== null && (
                        <div style={{ marginTop: 8 }}>
                          <span className="badge badge-cyan">
                            Verified Public Aggregate Spend: ${auditedTotal.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: PUBLIC MIDNIGHT LEDGER */}
        <section className="panel panel-public">
          <div className="panel-header">
            <h2 className="panel-title">
              <Globe size={18} color="#7c6eff" /> Public Midnight Ledger (On-Chain State)
            </h2>
            <span className="badge badge-accent">GLOBALLY VISIBLE · ZERO RAW SALARIES</span>
          </div>

          <div className="kv-grid">
            <div className="kv-box">
              <div className="kv-label">Contract Address (kernel.self)</div>
              <div className="kv-value mono">{shortHex(snapshot.contractAddress, 12, 10)}</div>
            </div>
            <div className="kv-box">
              <div className="kv-label">Sealed Organization ID</div>
              <div className="kv-value">{decodeLabel(engine.organizationId)}</div>
            </div>
            <div className="kv-box">
              <div className="kv-label">HistoricMerkleTree&lt;10&gt; Leaves</div>
              <div className="kv-value mono">{snapshot.voucherTreeSize.toString()} / 1024</div>
            </div>
            <div className="kv-box">
              <div className="kv-label">Current Merkle Root</div>
              <div className="kv-value mono">{shortHex(snapshot.voucherTreeRootHex, 10, 8)}</div>
            </div>
          </div>

          {/* Public Payroll Runs */}
          <div className="section-card">
            <h3>
              <Layers size={15} color="#7c6eff" /> Public Payroll Runs ({snapshot.runs.length})
            </h3>
            {snapshot.runs.length === 0 ? (
              <p className="empty-note">
                No payroll runs on chain yet. Click <strong>Load Q4 Demo</strong> or create one from
                Treasury Admin.
              </p>
            ) : (
              snapshot.runs.map(({ runId, run, runningTotalCommitmentHex, auditedTotal }) => (
                <div key={runId.toString()} className="run-card">
                  <div className="run-card-top">
                    <strong>Payroll Run #{runId.toString()}</strong>
                    <span className={`badge ${RUN_STATUS_LABEL[run.status].cls}`}>
                      {RUN_STATUS_LABEL[run.status].label}
                    </span>
                  </div>
                  <div className="run-metrics">
                    <div className="mini-stat">
                      <span>Budget Cap</span>
                      <strong>${run.budgetCap.toLocaleString()}</strong>
                    </div>
                    <div className="mini-stat">
                      <span>Salary Band</span>
                      <strong>
                        ${run.minAllocation.toLocaleString()}–${run.maxAllocation.toLocaleString()}
                      </strong>
                    </div>
                    <div className="mini-stat">
                      <span>Issued / Max</span>
                      <strong>
                        {run.issuedCount.toString()} / {run.expectedHeadcount.toString()}
                      </strong>
                    </div>
                    <div className="mini-stat">
                      <span>Claimed</span>
                      <strong>
                        {run.claimedCount.toString()} / {run.issuedCount.toString()}
                      </strong>
                    </div>
                  </div>
                  <div className="hash-line mono">
                    <span>runningTotalCommitment</span>
                    <span>{shortHex(runningTotalCommitmentHex, 12, 10)}</span>
                  </div>
                  <div className="hash-line">
                    <span>Aggregate Spend Disclosure</span>
                    <strong className="mono" style={{ color: auditedTotal !== null ? '#7dd3fc' : '#6ee7b7' }}>
                      {auditedTotal !== null
                        ? `$${auditedTotal.toLocaleString()} (AUDITED)`
                        : 'SHIELDED IN ZK'}
                    </strong>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Unlinkable Claimed Nullifiers */}
          <div className="section-card">
            <h3>
              <KeyRound size={15} color="#10b981" /> Claimed Nullifiers ({snapshot.claimedNullifiers.length})
            </h3>
            {snapshot.claimedNullifiers.length === 0 ? (
              <p className="empty-note">
                No vouchers claimed yet. Claims publish ONLY an unlinkable nullifier — never the
                voucher leaf index or employee identity.
              </p>
            ) : (
              snapshot.claimedNullifiers.map((n, idx) => (
                <div key={n} className="hash-line mono">
                  <span>Nullifier #{idx + 1}</span>
                  <span>{shortHex(n, 16, 12)}</span>
                </div>
              ))
            )}
          </div>

          {/* Selective-Disclosure Income Attestations */}
          <div className="section-card">
            <h3>
              <BadgeCheck size={15} color="#f59e0b" /> Verified Income Attestations (
              {snapshot.attestations.length})
            </h3>
            {snapshot.attestations.length === 0 ? (
              <p className="empty-note">
                No selective-disclosure income proofs published yet. Switch to an employee tab to
                prove <code className="mono">salary &gt;= threshold</code> without revealing exact
                salary.
              </p>
            ) : (
              snapshot.attestations.map(({ attestationIdHex, attestation }) => (
                <div key={attestationIdHex} className="voucher-item">
                  <div className="run-card-top">
                    <strong>
                      Proved &gt;= ${attestation.thresholdAmount.toLocaleString()} (Run #
                      {attestation.runId.toString()})
                    </strong>
                    <span className="badge badge-amber">EXACT SALARY HIDDEN</span>
                  </div>
                  <div className="hash-line">
                    <span>Verifier Tag</span>
                    <span className="mono">{decodeLabel(attestation.verifierTag)}</span>
                  </div>
                  <div className="hash-line mono">
                    <span>Attestation Receipt</span>
                    <span>{shortHex(attestationIdHex, 14, 10)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Bottom Panel: Circuit Execution Transcript */}
      <section className="panel transcript-panel">
        <div className="panel-header">
          <h2 className="panel-title">
            <Sparkles size={17} color="#7c6eff" /> Live Compact Circuit Execution Transcript (
            {engine.auditLog.length})
          </h2>
          <span className="badge">Real @midnight-ntwrk/compact-runtime Execution Log</span>
        </div>

        {engine.auditLog.map((item) => (
          <div key={item.seq} className="log-row">
            <div className="log-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`badge ${item.status === 'accepted' ? 'badge-emerald' : 'badge-rose'}`}>
                  {item.status === 'accepted' ? 'ACCEPTED' : 'ZK ASSERT REJECTED'}
                </span>
                <code className="mono" style={{ fontWeight: 600, fontSize: '0.84rem' }}>
                  {item.circuit}()
                </code>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  by {item.actor}
                </span>
              </div>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                #{item.seq}
              </span>
            </div>
            <div style={{ fontSize: '0.83rem', color: 'var(--text)' }}>{item.summary}</div>
            <div className="pill-row">
              {item.disclosedFields.map((f) => (
                <span key={`pub-${f}`} className="tiny-pill tiny-pill-public">
                  Public: {f}
                </span>
              ))}
              {item.keptPrivateFields.map((f) => (
                <span key={`priv-${f}`} className="tiny-pill tiny-pill-private">
                  Private: {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <LaceWalletModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        session={laceSession}
        onConnected={(s) => {
          setLaceSession(s);
          setWalletModalOpen(false);
          setToast({
            kind: 'success',
            text: `Connected to ${s.walletName} (${s.networkId}) via DApp Connector API v${s.apiVersion}.`,
          });
        }}
        onDisconnected={() => {
          setLaceSession(null);
          setToast({ kind: 'success', text: 'Disconnected Midnight Lace wallet.' });
        }}
      />
    </div>
  );
}
