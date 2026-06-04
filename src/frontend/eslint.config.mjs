import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
      ignores: ['**/dist', '**/out-tsc', '**/federation.config.js', '**/eslint.config.mjs', '**/proxy-local.config.js'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
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
                  sourceTag: 'scope:gameVault',
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
    },
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
