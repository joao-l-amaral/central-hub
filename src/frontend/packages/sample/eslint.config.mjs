// apps/portal/eslint.config.mjs  (same structure for all MFEs and portal-lib)
import baseConfig from '../../eslint.config.mjs';
import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    ...baseConfig,

    // ── TypeScript ─────────────────────────────────────
    {
        files: ['**/*.ts'],
        extends: [
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
            eslintConfigPrettier,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/component-selector': ['error', {
                type: 'element', prefix: 'sample', style: 'kebab-case',
            }],
            '@angular-eslint/directive-selector': ['error', {
                type: 'attribute', prefix: 'sample', style: 'camelCase',
            }],
            '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
            '@angular-eslint/prefer-signals': 'warn',
            '@angular-eslint/prefer-standalone': 'warn',
            '@angular-eslint/no-empty-lifecycle-method': 'warn',

            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_'
            }],

            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            'no-console':   'warn',
            'prefer-const': 'error',
            'eqeqeq':       'error',
            'no-var':       'error',
        },
    },

    // ── HTML Templates ─────────────────────────────────
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
        rules: {
            '@angular-eslint/template/prefer-control-flow':      'error',
            '@angular-eslint/template/eqeqeq':                   'error',
            '@angular-eslint/template/button-has-type':          'warn',
            '@angular-eslint/template/use-track-by-function':    'warn',
            '@angular-eslint/template/prefer-self-closing-tags': 'warn',
        },
    },
);
