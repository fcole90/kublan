// @ts-check

import config from '@kublan/config/eslintBaseConfig.mjs';

/** @type {import('@kublan/config/types').ESLintConfigWithExtends[]} */
export default [...config, { ignores: ['node_modules', 'dist'] }];
