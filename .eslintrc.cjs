// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Ignore files
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Base ESLint rules
  eslint.configs.recommended,

  // TS ESLint (type-aware)
  ...tseslint.configs.recommendedTypeChecked,

  // Prettier plugin
  prettierRecommended,

  // Language options
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    rules: {
      /** -------------------------
       *  🚨 Unused Variables Warning
       * ------------------------- */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',        // ignore unused function args like `_req`
          varsIgnorePattern: '^_',        // ignore unused variables like `_debug`
          caughtErrorsIgnorePattern: '^_', // ignore unused catch vars
        },
      ],

      /** -------------------------
       *  Other rules
       * ------------------------- */
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      /** Prettier — remove CRLF warnings */
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
    },
  },
);
