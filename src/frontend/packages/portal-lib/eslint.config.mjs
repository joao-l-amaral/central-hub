import baseConfig from '../../eslint.config.mjs';
import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'lib',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase',
        },
      ],
    },
  },
);
