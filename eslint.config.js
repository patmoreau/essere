import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'build', '.env', '**/*.svg']),
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      semi: ['error', 'always'],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
]);
