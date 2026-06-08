import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...baseConfig,
  {
  files: ['**/*.ts'],
  rules: {
    '@angular-eslint/component-selector': [
      'error',
      {
        type: 'element',
        prefix: 'gameq',
        style: 'kebab-case',
      },
    ],
    '@angular-eslint/directive-selector': [
      'error',
      {
        type: 'attribute',
        prefix: 'gameq',
        style: 'camelCase',
      },
    ],
  },
});
