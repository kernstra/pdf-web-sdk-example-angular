// Runs the Angular CLI with the license key passed as --define, which is how
// src/environments/*.ts receive it:
//   ng <command> --define "KERNSTRA_LICENSE='<your key>'"
// The key comes from KERNSTRA_LICENSE in the environment, or from .env.local.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

if (!process.env.KERNSTRA_LICENSE && existsSync('.env.local')) {
  process.loadEnvFile('.env.local');
}
const license = process.env.KERNSTRA_LICENSE ?? '';
const ng = createRequire(import.meta.url).resolve('@angular/cli/bin/ng.js');
const args = [...process.argv.slice(2), '--define', `KERNSTRA_LICENSE=${JSON.stringify(license)}`];

spawn(process.execPath, [ng, ...args], { stdio: 'inherit' }).on('exit', (code) =>
  process.exit(code ?? 1),
);
