import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';
import { CircleComponent } from './circle-component';

const meta: Meta<CircleComponent> = {
    component: CircleComponent,
    title: 'CircleComponent',
};
export default meta;

type Story = StoryObj<CircleComponent>;

export const Circle: Story = {
    render: (args) => ({
        props: {
            ...args,
            action: () => args.selected && alert('Circle action triggered with selected=true!'),
        },
        template: `
      <div style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
        <div style="width: 100%; height: 100%">
          <lib-circle-component ${argsToTemplate(args)} [onAction]="action" />
        </div>
      </div>
    `,
    }),
    args: {
        icon: 'bi bi-playstation',
        label: 'Playstation',
        selected: true,
    },
};
