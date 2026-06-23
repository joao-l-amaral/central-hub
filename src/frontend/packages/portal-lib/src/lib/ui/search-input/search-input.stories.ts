import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { SearchInputComponent } from './search-input';

const meta: Meta<SearchInputComponent> = {
  component: SearchInputComponent,
  title: 'SearchInputComponent',
};
export default meta;

type Story = StoryObj<SearchInputComponent>;

export const SearchInput: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <lib-search-input
        ${argsToTemplate(args)}
      ></lib-search-input>
    `,
  }),
  args: {
    placeholder: "Placeholder test",
    disabled: false,
    onKeySearch: false
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    onKeySearch: {
      control: { type: 'boolean' }
    }
  },
};
