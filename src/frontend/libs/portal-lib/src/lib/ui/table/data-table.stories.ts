import {
  applicationConfig,
  argsToTemplate,
  Meta, moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import {TableDtComponent} from "./data-table";
import {DataTableCell} from "./feature-data-table-cell/data-table-cell";

const meta: Meta<TableDtComponent<any>> = {
  component: TableDtComponent,
  title: 'DataTableComponent',
  decorators: [
    applicationConfig({
      providers: [],
    }),
    moduleMetadata({
      imports: [DataTableCell],
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
          <lib-dt-col header="Name" key="name"></lib-dt-col>

          <lib-dt-col header="Age" key="age">
            <ng-template dtTemplate let-value let-row="row">
              <strong>{{ value }}</strong>
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Role" key="role">
            <ng-template dtTemplate let-value>
              <span class="badge text-bg-secondary">{{ value }}</span>
            </ng-template>
          </lib-dt-col>
        </lib-table-dt>
    `,
  }),
  args: {
    rows: [
      { name: 'Chris', age: 22, role: 'Author' },
      { name: 'Dennis', age: 45, role: 'Reviewer' },
      { name: 'aaa', age: 45, role: 'aaa' },
      { name: 'bbbb', age: 45, role: 'bbb' },
    ]
  },
  argTypes: {

  },
};
