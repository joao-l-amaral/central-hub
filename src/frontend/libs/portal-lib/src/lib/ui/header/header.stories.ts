import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'HeaderComponent',
};
export default meta;

type Story = StoryObj<HeaderComponent>;

export const Header: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
        <lib-header
            ${argsToTemplate(args)}
            [text]="text"
            [subText]="subText"
            [icon]="icon"
        />
    `,
  }),
  args: {
    text: 'Sample Header',
    subText: 'Sample Subtitle',
    icon: 'bi bi-info-circle',
  },
};
