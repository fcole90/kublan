// @ts-check

import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./examples/index.ts'],
  bundle: true,
  outdir: 'public/dist/examples',
  outbase: 'examples',
  outExtension: {
    '.js': '.mjs',
  },
  format: 'esm',
  allowOverwrite: true,
})