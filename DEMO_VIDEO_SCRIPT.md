# VeilPay — 2-Minute Demo Video Script (Midnight Buildathon · Wave 3)

**Target Runtime:** 2 minutes 00 seconds (`120s`)
**Recording Setup:** 1920x1080 screen capture (OBS / QuickTime / Loom). Split workflow: Terminal (`35s`) -> Live Browser App at `http://localhost:5173` (`85s`).

---

## Scene 1 — Hook & Real Compilation Proof (`0:00 – 0:25`)
**On Screen:**
- Terminal window open in the VeilPay repository root.
- Run: `pnpm run compile:fast && pnpm test` (or show `ls -lh contract/managed/veilpay/keys/` to display all 8 generated `.prover`/`.verifier` key files, then run `pnpm test`).
- Highlight the green output: `Test Files 2 passed (2) | Tests 14 passed (14)`.

**Narration:**
> "Hi Midnight Buildathon judges! This is **VeilPay** — a shielded corporate payroll and selective-disclosure compliance vault built natively on **Midnight Compact 0.28**.
> On transparent chains, on-chain payroll leaks every employee's salary to competitors and coworkers. On opaque mixers, companies fail budget audits and employees can't prove income.
> Here in the terminal, you can see our 8-circuit Compact contract compiled cleanly with `compactc 0.36.1`, complete with proving and verifying keys, and all 14 simulator, security, and byte-level privacy invariant tests passing."

---

## Scene 2 — Dual-Ledger X-Ray Console & Hidden Budget-Cap Enforcement (`0:25 – 0:55`)
**On Screen:**
- Switch to browser running `pnpm dev` (`http://localhost:5173`).
- Point cursor briefly to the top **Live Privacy Invariant Audit** green banner (`0 SECRETS LEAKED ON PUBLIC LEDGER`) and the **Connect Lace Wallet** button (DApp Connector API v4).
- Click **Load Q4 Demo** (populates Run #1: `$35,000` cap, `$4,000–$18,000` band, `3 / 4` shielded vouchers totaling `$29,000`: Alice `$12,750`, Bob `$9,400`, Charlie `$6,850` — leaving 1 open slot with `$6,000` remaining headroom).
- Click **Treasury Admin** tab.
  - Point to Left Panel (**Local Private State**): shows hidden cumulative spend `$29,000` and individual salaries.
  - Point to Right Panel (**Public Midnight Ledger**): shows ONLY the public cap `$35,000`, headcount `3/4`, `HistoricMerkleTree<10>` root, and opaque `runningTotalCommitment` — **ZERO salaries, ZERO running total!**
  - Click **Test Budget/Band Rejection** (attempts `$6,500` -> `$29,000 + $6,500 = $35,500 > $35,000` cap) and show the live red `Circuit Rejected: Issuing voucher would exceed payroll run budget cap` toast firing directly from the compiled Compact runtime!

**Narration:**
> "Now let's open the VeilPay Dual-Ledger X-Ray console, running our real compiled Compact contract live in the browser via `@midnight-ntwrk/compact-runtime` WASM.
> I'll click **Load Q4 Demo** to open Payroll Run #1 with a `$35,000` budget cap and issue three shielded vouchers totaling `$29,000`.
> Notice the split screen: on the left is Treasury Admin's local private state. On the right is the public Midnight ledger — it shows only the public governance cap, headcount, and opaque cryptographic commitments. Zero individual salaries or running totals exist on chain, confirmed continuously by our live byte-level privacy leak scanner at the top."

---

## Scene 3 — Unlinkable Shielded Claim & Double-Claim Nullifier Rejection (`0:55 – 1:25`)
**On Screen:**
- Switch persona tab to **Alice Chen**.
- Show that Alice's device sees *only* Alice's `$12,750` voucher (not Bob's or Charlie's).
- Click **Claim Shielded Voucher (`claimVoucher`)**.
  - Watch Right Panel update: `Claimed 1 / 3` and a new **Nullifier #1** appears under Claimed Nullifiers.
- Immediately click **Test Double-Claim Replay (Nullifier Reject)** -> red toast: `Circuit Rejected: Voucher has already been claimed`.

**Narration:**
> "Switching to Alice's device, she sees only her own private voucher. When she clicks **Claim Shielded Voucher**, the circuit verifies her inclusion in the on-chain `HistoricMerkleTree` privately inside ZK and publishes only an unlinkable nullifier — so observers can't even tell which voucher leaf she claimed.
> If Alice tries to replay her claim, the nullifier set immediately rejects the transaction."

---

## Scene 4 — Two-Tier Programmable Selective Disclosure (`1:25 – 1:52`)
**On Screen:**
- Still on **Alice Chen**:
  - Keep Threshold `$10,000`, Verifier Tag `MetroBank-Mortgage-2026`.
  - Click **Generate ZK Income Proof**. Point to Right Panel under **Verified Income Attestations**: shows `Proved >= $10,000` with badge `EXACT SALARY HIDDEN`!
  - Click **Test False Threshold (+$5k Reject)** -> red toast: `Verified salary is below the requested income threshold`.
- Switch to **Treasury Admin** -> click **Finalize Run #1**.
- Switch to **Compliance Auditor**:
  - Click **Test Tampered Total (-$1 Reject)** -> red toast: `Audit opening does not match committed running total`.
  - Click **Verify & Disclose Aggregate Total** -> Run #1 updates to `AUDITED` with `$29,000`, while the top green banner STILL confirms `0 SECRETS LEAKED` (individual salaries remain hidden!).

**Narration:**
> "Now watch Midnight's selective disclosure in action. First, Alice proves to MetroBank that she earned at least `$10,000` without revealing her exact `$12,750` salary — and attempting to overstate her income is rejected in-circuit.
> Second, once Treasury finalizes Run #1, the Compliance Auditor can selectively open *only* the aggregate payroll spend of `$29,000` — rejecting any tampered total by even one dollar — while every individual employee's salary remains 100% private."

---

## Scene 5 — Lace Wallet Integration & Close (`1:52 – 2:00`)
**On Screen:**
- Click **Connect Lace Wallet** briefly to show `@midnight-ntwrk/dapp-connector-api@4.1.0` (`preprod` / `preview` / `undeployed`) readiness, close modal, and scroll briefly over the **Live Circuit Execution Transcript** at the bottom.

**Narration:**
> "VeilPay also integrates Midnight's Lace DApp Connector API v4 for testnet deployment, is open-sourced under Apache 2.0, and is ready for Wave 4 shielded token settlement. Thanks for watching!"
