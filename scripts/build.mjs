// @ts-check

import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/lib/index.ts'],
  sourceRoot: 'src',
  bundle: true,
  outdir: 'build',
  loader: {
    '.html': 'text',
  }
})