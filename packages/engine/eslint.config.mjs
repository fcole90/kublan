// @ts-check

import config from '@kublan/common/eslintBaseConfig.mjs'

/** @type {import('@kublan/common/types').ESLintConfigWithExtends[]} */
export default [
  ...config,
  { ignores: ['node_modules', 'dist'] }
];
