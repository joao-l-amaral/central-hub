import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
      ignores: ['**/dist', '**/out-tsc', '**/federation.config.js', '**/eslint.config.mjs', '**/proxy-local.config.js'],
  },
  ...tseslint.config({
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      ...angular.configs.templateAccessibility,
      eslintConfigPrettier,
    ],
  }),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    processor: angular.processInlineTemplates,
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
              // Apps can only depend on libs, not other apps
              {
                  sourceTag: 'type:app',
                  onlyDependOnLibsWithTags: ['type:lib'],
              },

              // Libs can only depend on other libs
              {
                  sourceTag: 'type:lib',
                  onlyDependOnLibsWithTags: ['type:lib'],
              },

              // Portal shell can use shared libs only and micro-frontends
              {
                  sourceTag: 'scope:portal',
                  onlyDependOnLibsWithTags: ['scope:shared'],
              },

              // Each MFE can only use shared libs — NOT each other, NOT portal
              {
                  sourceTag: 'scope:shelveProducts',
                  onlyDependOnLibsWithTags: ['scope:shared'],
              },
              {
                  sourceTag: 'scope:sample',
                  onlyDependOnLibsWithTags: ['scope:shared'],
              },
              {
                  sourceTag: 'scope:gameQ',
                  onlyDependOnLibsWithTags: ['scope:shared'],
              },

              // Shared lib cannot import from apps or other scoped libs
              {
                  sourceTag: 'scope:shared',
                  onlyDependOnLibsWithTags: ['scope:shared'],
              },
          ],
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      'no-console': 'warn',
      'prefer-const': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/button-has-type': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
    }
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
