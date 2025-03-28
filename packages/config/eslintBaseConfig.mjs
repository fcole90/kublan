// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @typedef {import('typescript-eslint')} */

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {

    rules: {
      // Note: you must disable the base rule as it can report incorrect errors
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ]
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    ignores: ['node_modules', 'dist'],
  },
);
