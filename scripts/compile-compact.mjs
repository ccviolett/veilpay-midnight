import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'contract', 'veilpay.compact');
const target = path.join(root, 'contract', 'managed', 'veilpay');
const extraArgs = process.argv.slice(2);

const localBinary = path.join(root, '.tools', 'compactc', 'compactc');
const envBinary = process.env.COMPACTC_BIN;

let cmd;
let args;

if (envBinary && existsSync(envBinary)) {
  cmd = envBinary;
  args = [...extraArgs, source, target];
} else if (existsSync(localBinary)) {
  cmd = localBinary;
  args = [...extraArgs, source, target];
} else {
  // Fallback to official `compact` CLI installed via Midnight installer
  cmd = 'compact';
  args = ['compile', ...extraArgs, source, target];
}

console.log(`[veilpay] Compiling ${path.relative(root, source)} -> ${path.relative(root, target)}`);
console.log(`[veilpay] Command: ${cmd} ${args.join(' ')}`);

execFileSync(cmd, args, { stdio: 'inherit', cwd: root });
console.log('[veilpay] Compilation succeeded.');
