import {
  applicationConfig,
  argsToTemplate,
  Meta, moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import {TableDtComponent} from "./data-table";
import {DataTableCol} from "./feature-data-table-cell/data-table-cell";
import {DtCellTemplateDirective} from "./util-data-table-commons/data-table-cell-template-directive";
import {StaticDataSource} from "./util-datasource/static-data-source";
import {TRow} from './data-table.types';
import {I18nService} from "../../util-i18n/i18n-service";

const meta: Meta<TableDtComponent> = {
  component: TableDtComponent,
  title: 'DataTableComponent',
  decorators: [
    applicationConfig({
      providers: [I18nService],
    }),
    moduleMetadata({
      imports: [TableDtComponent, DataTableCol, DtCellTemplateDirective],
    }),
  ],
};
export default meta;

type Story = StoryObj<TableDtComponent>;

export const TableDataTableInput: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
        <lib-table-dt
          ${argsToTemplate(args)}
        >
          <lib-dt-col header="Name" key="name" class="hide-on-small">
            <ng-template dtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Age" key="age" class="hide-on-small">
            <ng-template dtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Role" key="role">
            <ng-template dtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Function" key="function">
            <ng-template dtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>
        </lib-table-dt>
    `,
  }),
  args: {
    search: true,
    dataSource: new StaticDataSource<TRow>([
      { name: 'Chris', age: 22, role: 'Author' },
      { name: 'Dennis', age: 45, role: 'Reviewer' },
      { name: 'aaa', age: 45, role: 'aaa' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'Chris', age: 22, role: 'Author' },
      { name: 'Dennis', age: 45, role: 'Reviewer' },
      { name: 'aaa', age: 45, role: 'aaa' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'Chris', age: 22, role: 'Author' },
      { name: 'Dennis', age: 45, role: 'Reviewer' },
      { name: 'aaa', age: 45, role: 'aaa' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'zzzzz', age: 45, role: 'bbb', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' }
    ])
  },
  argTypes: {
    search: {
      control: { type: 'boolean' }
    }
  },
};
