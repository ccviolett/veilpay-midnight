# VeilPay — Pitch Deck (Midnight Buildathon · Wave 3)

> Ready-to-present 10-slide structure (copy straight into Google Slides / Pitch / Canva / Marp).

---

## Slide 1 — Title
### **VeilPay**
**Shielded Corporate Payroll & Selective-Disclosure Compliance Vault on Midnight**

- Private salaries. Provable budgets. Selective compliance.
- Built natively on **Midnight Network** (`Compact 0.28` · `compactc 0.36.1` · `Ledger v9`)
- Open Source: **Apache License 2.0** · Topic: `midnightntwrk`

---

## Slide 2 — The Problem: Transparent Chains Break Enterprise Payroll
Every DAO, protocol foundation, and Web3-native company paying global contributors on-chain faces an impossible tradeoff:

1. **On Transparent Chains (Ethereum / Solana / L2s):**
   - Paying contributors publicly broadcasts **every employee's exact salary** to coworkers, competitors, recruiters, and phishing attackers.
   - Links employee personal wallets permanently to employer treasury schedules.
2. **On Opaque Privacy Mixers:**
   - Fails **DAO governance** (token holders can't verify payroll stayed within approved budgets).
   - Fails **enterprise audits & employee life needs** (employees can't prove income for a mortgage/visa; auditors can't verify total spend).

**Result:** 90%+ of crypto-native organizations still fall back to opaque centralized Web2 payroll rails.

---

## Slide 3 — Why Midnight? Rational Privacy via Dual-Ledger ZK
VeilPay isn't a port of an EVM contract—it relies directly on primitives unique to **Midnight**:

- **Public Ledger (`ledger`):** Enforces global governance rules (`budgetCap`, salary bands, headcount, status) and stores opaque commitments & nullifiers.
- **Local Private State (`witness`):** Keeps secret keys, individual salaries, employee identities, and blinding salts strictly on the user's device.
- **Compile-Time Disclosure Safety (`disclose()`):** Compact 0.28 statically prevents accidental leakage of witness values into ledger operations.
- **Programmable Selective Disclosure:** Reveal *only* the mathematical fact a counterparty needs—nothing more.

---

## Slide 4 — Introducing VeilPay: End-to-End Flow
1. **Treasury Opens Payroll Run (`createPayrollRun`):** Sets public governance bounds (`budgetCap: $35,000`, band `$4k–$18k`, `headcount: 3`) + hidden `$0` accumulator commitment.
2. **Shielded Issuance (`issueVoucher`):** For each employee, ZK circuit verifies `min <= salary <= max` AND `runningTotal + salary <= budgetCap` **without publishing any salary, identity, or running total**. Appends hiding commitment to `HistoricMerkleTree<10>`.
3. **Unlinkable Claim (`claimVoucher`):** Employee proves Merkle membership privately in ZK and publishes an unlinkable `nullifier`—breaking issuance-to-claim linkage and preventing double-claims.
4. **Employee Income Proof (`proveIncomeThreshold`):** Employee proves `salary >= $10,000` for a bank/landlord while keeping exact `$12,750` salary hidden.
5. **Auditor Aggregate Audit (`discloseRunTotal`):** After `finalizeRun`, authorized Compliance Auditor discloses *only* aggregate spend (`$29,000`)—individual salaries remain 100% shielded.

---

## Slide 5 — Cryptographic Architecture & Security Guarantees
- **8 Compiled ZK Circuits** (full `zkir-v3` proving & verifying keys compiled in 15.8s via `compactc 0.36.1`).
- **Zero `ownPublicKey()` Dependence:** All role auth uses witness-derived keys (`persistentHash([domain, orgId, sk])`); post-deploy employee keys, nullifiers, and attestations bind to `kernel.self().bytes` to stop cross-contract replay.
- **Dictionary-Attack-Resistant Commitments:** Uses `persistentCommit` with mandatory fresh 32-byte salts (`newSalt != prevSalt`) so low-entropy salary integers cannot be brute-forced on-chain.
- **Concurrent-Safe `HistoricMerkleTree<10, Bytes<32>>`:** Supports up to 1,024 vouchers per vault without invalidating in-flight employee proofs.

---

## Slide 6 — Two-Tier Programmable Selective Disclosure
| Stakeholder | What They Verify On-Chain | What Remains 100% Shielded |
| :--- | :--- | :--- |
| **Public / DAO Members** | Budget cap respected, band respected, headcount & claim counts | Individual salaries, employee identities, running spend, which leaf was claimed |
| **Mortgage Bank / Landlord** | Verified ZK attestation: `salary >= $10,000` for `Run #1` | Exact salary (`$12,750`), employer voucher leaf, employee secret/public key |
| **Compliance Auditor / Board** | Verified aggregate spend (`$29,000 <= $35,000`) after finalization | Individual salaries, per-employee allocations, employee identities |

---

## Slide 7 — Live Verification & Quality Assurance
- **Real Compilation (Zero Mocks):** `compactc v0.36.1` compiles all 8 circuits + generates `.prover` / `.verifier` keys with zero warnings.
- **14/14 Passing Automated Tests (`Vitest`):**
  - End-to-end 3-employee multi-actor payroll lifecycle
  - Hidden budget-cap overflow & compensation-band rejections
  - Double-claim nullifier replay, stolen-voucher, and cross-run replay rejections
  - False income-threshold & tampered aggregate-audit rejections
  - RBAC enforcement & Treasury Admin key rotation
  - Midnight Lace DApp Connector API v4 integration test
- **Automated Byte-Level Privacy Leak Scanner:** Walks every public byte array & scalar on the decoded Midnight ledger to prove `0` leaked secrets (with positive self-tests confirming the scanner catches intentional leaks).

---

## Slide 8 — User Experience: Dual-Ledger X-Ray Console
- **Real In-Browser Compact Execution:** Runs the compiled `veilpay.compact` contract live in the browser via `@midnight-ntwrk/compact-runtime@0.21.0` + WASM `onchain-runtime-v4`.
- **Side-by-Side Private vs. Public View:** Switch between **Treasury Admin**, **Alice**, **Bob**, **Charlie**, and **Compliance Auditor** devices and watch the public ledger update in real time while the **Live Privacy Audit Banner** confirms `0 secrets leaked`.
- **Interactive Adversarial Testing:** One-click buttons to trigger live ZK rejections (Budget Overflow, Double-Claim Replay, False Income Threshold, Tampered Audit Total).
- **Midnight Lace Ready:** Native `@midnight-ntwrk/dapp-connector-api@4.1.0` integration (`window.midnight.mnLace`) supporting `preprod`, `preview`, `undeployed`, and `mainnet`.

---

## Slide 9 — Market Opportunity & Adoption Path
- **Target Audience:**
  - **Initial Beachhead:** Crypto-native DAOs, protocol foundations, and Midnight ecosystem teams (10–250 global contributors paying $50k–$2M/month on-chain).
  - **Expansion Market:** Global remote startups & B2B contractor platforms (Deel / Request Finance / Safe-adjacent Web3 treasury stack) needing privacy-preserving stablecoin payroll + verifiable compliance proofs.
- **Business Model:**
  - Open-source Apache-2.0 core protocol (`VeilPay` contracts) to drive developer trust and Midnight adoption.
  - SaaS enterprise dashboard tier: per-active-contributor fee ($8–$15/contractor/month) + compliance attestation API for HR/accounting integrations (Xero/QuickBooks/tax exports).
- **Go-to-Market:** Partner with Midnight ecosystem DAOs & grant committees first (dogfooding shielded contributor grants), then integrate directly with Safe/multi-sig treasuries and Lace wallet.

---

## Slide 10 — Wave 3 Delivered & Wave 4 Roadmap
- **Completed in Wave 3 (Today):**
  - Full 8-circuit `veilpay.compact` ZK contract (`compactc 0.36.1` compiled + prover/verifier keys)
  - Multi-actor simulator + 14/14 passing QA & privacy-invariant tests
  - Interactive Dual-Ledger X-Ray Web UI + Midnight Lace v4 wallet connector
- **Next in Wave 4:**
  - Native Midnight shielded token settlement (`receiveShielded` / `sendShielded`) on Preprod/Preview Testnet
  - X25519 encrypted off-chain voucher inbox for automated HR-to-employee delivery
  - Multi-sig Treasury Admin approvals & CSV batch payroll issuance

**Try it locally in 30 seconds:** `pnpm install && pnpm test && pnpm dev`
