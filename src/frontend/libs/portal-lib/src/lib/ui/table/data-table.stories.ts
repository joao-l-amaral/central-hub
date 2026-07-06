import {
  applicationConfig,
  argsToTemplate,
  Meta, moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import {TableDtComponent} from "./data-table";
import {DataTableCol} from "./col/data-table-col";

const meta: Meta<TableDtComponent<any>> = {
  component: TableDtComponent,
  title: 'DataTableComponent',
  decorators: [
    applicationConfig({
      providers: [],
    }),
    moduleMetadata({
      imports: [DataTableCol],
    }),
  ],
};
export default meta;

type Story = StoryObj<TableDtComponent<any>>;

export const SideBarNavInput: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <lib-table-dt
          ${argsToTemplate(args)}
      >
        <lib-dt-col header="aaa" key="1"></lib-dt-col>
        <lib-dt-col header="bbb" key="2"></lib-dt-col>
        <lib-dt-col header="ccc" key="3"></lib-dt-col>
        <lib-dt-col header="ddd" key="4"></lib-dt-col>
        <lib-dt-col header="eee" key="5"></lib-dt-col>
        <lib-dt-col header="fff" key="6"></lib-dt-col>
      </lib-table-dt>
    `,
  }),
  args: {

  },
  argTypes: {

  },
};
