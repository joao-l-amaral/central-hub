import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { KeyValueComponent } from './key-value.component';

const meta: Meta<KeyValueComponent> = {
  component: KeyValueComponent,
  title: 'KeyValueComponent',
};
export default meta;

type Story = StoryObj<KeyValueComponent>;

export const KeyValue: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div class="row">
        <div class="col-sm-12">
          <lib-key-value
            ${argsToTemplate(args)}
          />
        </div>
      </div>
    `,
  }),
  args: {
    label: 'label',
    value: 'value',
    subLabel: 'subLabel',
    colArea: '12',
  },
};
