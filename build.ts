import { $ } from 'bun';

// ESM
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/esm',
  format: 'esm',
  sourcemap: 'external',
  target: 'node',
});

// CJS
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/cjs',
  format: 'cjs',
  sourcemap: 'external',
  target: 'node',
  naming: '[dir]/[name].cjs',
});

// Type declarations
await $`tsc -p tsconfig.json`;
