import nx from '@nx/eslint-plugin';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: [
            '**/dist',
            '**/.angular',
            '**/coverage',
            '**/vite.config.*.timestamp*',
            '**/vitest.config.*.timestamp*',
            '**/*.mjs',
            '**/webpack.config.ts',
            '**/webpack.prod.config.ts',
            '**/module-federation.config.ts',
            '**/*.mjs',
            '**/proxy-local.config.js',
            '**/*.config.js',
        ],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: [
                        '^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$',

                        // Module Federation remote imports — resolved at runtime, not build time
                        'sample/.*',
                        'gameVault/.*',
                        'shelveProducts/.*',
                    ],
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
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        // config files don't belong to any tsconfig — ignore typed linting for them
        files: ['**/*.mjs', '**/*.cjs', 'eslint.config.*'],
        languageOptions: {
            parserOptions: {
                project: null,   // ← disable typed linting for config files
            },
        },
    },
];
