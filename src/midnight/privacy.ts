// SPDX-License-Identifier: Apache-2.0
// Browser- and Node-compatible Public Ledger Privacy Invariant Auditor.
// Recursively walks every byte array and scalar value exposed by the decoded
// public Midnight ledger to prove zero leakage of private secrets.

export interface PublicBytesEntry {
  readonly path: string;
  readonly bytes: Uint8Array;
}

export interface PrivacyAuditReport {
  readonly passed: boolean;
  readonly inspectedByteEntries: number;
  readonly inspectedScalars: number;
  readonly leaks: ReadonlyArray<{
    readonly secretName: string;
    readonly foundAt: string;
  }>;
}

export function bytesToHex(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i]!.toString(16).padStart(2, '0');
  }
  return out;
}

export function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/^0x/i, '').trim();
  if (clean.length % 2 !== 0) {
    throw new Error('Hex string must have even length');
  }
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

export function utf8ToFixedBytes32(label: string): Uint8Array {
  const encoded = new TextEncoder().encode(label);
  const buf = new Uint8Array(32);
  buf.set(encoded.subarray(0, 32));
  return buf;
}

export function randomBytes32(): Uint8Array {
  const out = new Uint8Array(32);
  globalThis.crypto.getRandomValues(out);
  return out;
}

export function deterministicBytes32(seedByte: number, tag = 0): Uint8Array {
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    out[i] = ((seedByte * 31 + tag * 17 + i * 7 + 13) & 0xff);
  }
  return out;
}

const isIterable = (v: object): v is Iterable<unknown> =>
  typeof (v as { [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function';

export function collectPublicLedgerData(
  ledger: unknown,
  root = 'ledger',
): { byteEntries: PublicBytesEntry[]; scalars: Array<{ path: string; value: bigint }> } {
  const byteEntries: PublicBytesEntry[] = [];
  const scalars: Array<{ path: string; value: bigint }> = [];
  const seen = new Set<object>();

  const walk = (value: unknown, path: string): void => {
    if (value instanceof Uint8Array) {
      byteEntries.push({ path, bytes: value });
      return;
    }
    if (typeof value === 'bigint') {
      scalars.push({ path, value });
      return;
    }
    if (value === null || typeof value !== 'object' || seen.has(value)) {
      return;
    }
    seen.add(value);

    if (Array.isArray(value)) {
      value.forEach((item, idx) => walk(item, `${path}[${idx}]`));
      return;
    }

    if (isIterable(value)) {
      const isMap = typeof (value as { lookup?: unknown }).lookup === 'function';
      let i = 0;
      for (const entry of value) {
        if (isMap && Array.isArray(entry) && entry.length === 2) {
          walk(entry[0], `${path}[${i}].key`);
          walk(entry[1], `${path}[${i}].value`);
        } else {
          walk(entry, `${path}[${i}]`);
        }
        i++;
      }
      return;
    }

    for (const key of Object.keys(value)) {
      const field = (value as Record<string, unknown>)[key];
      if (typeof field === 'function') continue;
      walk(field, `${path}.${key}`);
    }
  };

  walk(ledger, root);
  return { byteEntries, scalars };
}

export function auditPublicLedgerPrivacy(
  ledger: unknown,
  secretBytes: Record<string, Uint8Array>,
  forbiddenScalars: Record<string, bigint> = {},
): PrivacyAuditReport {
  const { byteEntries, scalars } = collectPublicLedgerData(ledger);
  const leaks: Array<{ secretName: string; foundAt: string }> = [];

  for (const [secretName, bytes] of Object.entries(secretBytes)) {
    const targetHex = bytesToHex(bytes);
    if (!targetHex) continue;
    for (const entry of byteEntries) {
      if (bytesToHex(entry.bytes).includes(targetHex)) {
        leaks.push({ secretName, foundAt: entry.path });
      }
    }
  }

  for (const [secretName, secretNum] of Object.entries(forbiddenScalars)) {
    for (const scalar of scalars) {
      if (scalar.value === secretNum) {
        leaks.push({ secretName: `${secretName} (${secretNum})`, foundAt: scalar.path });
      }
    }
  }

  return {
    passed: leaks.length === 0,
    inspectedByteEntries: byteEntries.length,
    inspectedScalars: scalars.length,
    leaks,
  };
}

export function assertNoPublicStateLeaks(
  ledger: unknown,
  secretBytes: Record<string, Uint8Array>,
  forbiddenScalars: Record<string, bigint> = {},
): PrivacyAuditReport {
  const report = auditPublicLedgerPrivacy(ledger, secretBytes, forbiddenScalars);
  if (!report.passed) {
    const details = report.leaks
      .map((l) => `${l.secretName} leaked at ${l.foundAt}`)
      .join('\n  ');
    throw new Error(`Privacy invariant violated:\n  ${details}`);
  }
  return report;
}
