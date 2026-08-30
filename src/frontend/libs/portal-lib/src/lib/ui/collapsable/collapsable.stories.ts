import {
  applicationConfig,
  argsToTemplate,
  Meta,
  StoryObj,
} from '@storybook/angular';
import { CollapsableComponent } from './collapsable';
import { I18nService } from '../../util-i18n';

const meta: Meta<CollapsableComponent> = {
  component: CollapsableComponent,
  title: 'CollapsableComponent',
  decorators: [
    applicationConfig({
      providers: [I18nService],
    }),
  ],
};
export default meta;

type Story = StoryObj<CollapsableComponent>;

export const Collapsable: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="width:800px;">
        <lib-collapsable
            ${argsToTemplate(args)}
        >
          <p>Collapsible content</p>
        </lib-collapsable>
      </div>
    `,
  }),
  args: {
    title: 'Collapsable title',
    isExpanded: true,
  },
};
