import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
    stories: ['../src/lib/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
    addons: ['@storybook/addon-essentials'],
    framework: {
        name: '@storybook/angular',
        options: {},
    },
};
export default config;
