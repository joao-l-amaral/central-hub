import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'ButtonComponent',
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Button: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <button
        chButton
        ${argsToTemplate(args)}
      ></button>
    `,
  }),
  args: {
    label: 'label test',
    icon: 'bi bi-playstation',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    label: {
      control: { type: 'text' },
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon CSS class (e.g., "bi bi-star" for Bootstrap Icons)',
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
};
