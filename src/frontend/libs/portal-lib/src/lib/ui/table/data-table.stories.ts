import {applicationConfig, argsToTemplate, Meta, moduleMetadata, StoryObj,} from '@storybook/angular';
import {TableDtComponent} from "./data-table";
import {DataTableCell} from "./feature-data-table-cell/ui-cell/data-table-cell";
import {DtCellTemplateDirective} from "./util-data-table-commons/data-table-cell-template-directive";
import {StaticDataSource} from "./util-datasource/static-data-source";
import {TRow} from './data-table.types';
import {I18nService} from "../../util-i18n/i18n-service";
import {ActionCell} from "./feature-data-table-cell/ui-action/action-cell";
import {RequestFactory} from "./util-request/request-factory";
import { LoadingBlockService } from "../loading-block/loading-block-service";

const meta: Meta<TableDtComponent> = {
  component: TableDtComponent,
  title: 'DataTableComponent',
  decorators: [
    applicationConfig({
      providers: [I18nService, LoadingBlockService, RequestFactory],
    }),
    moduleMetadata({
      imports: [TableDtComponent, DataTableCell, ActionCell, DtCellTemplateDirective],
    }),
  ],
};
export default meta;

type Story = StoryObj<TableDtComponent>;

export const TableDataStaticDataSource: Story = {
  render: (args) => ({
    props: {
      ...args,
      rowClicked: (value: unknown) => {
        console.log(value);
      },
      buttonClick: (context: string) => {
        console.log(context);
      }
    },
    template: `
        <lib-table-dt
          ${argsToTemplate(args)},
          (rowClicked)="rowClicked($event)"
        >
          <lib-dt-col header="Name" key="name" class="hide-on-small">
            <ng-template libDtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Age" key="age" class="hide-on-small">
            <ng-template libDtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Role" key="role">
            <ng-template libDtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Function" key="function">
            <ng-template libDtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-action-col header="Action" key="action">
            <ng-template libDtTemplate>
              <a>
                <i class="bi bi-pencil" (click)="buttonClick('teste1')"></i>
              </a>
            </ng-template>
            <ng-template libDtTemplate>
              <a>
                <i class="bi bi-trash" (click)="buttonClick('teste2')"></i>
              </a>
            </ng-template>
          </lib-dt-action-col>
        </lib-table-dt>
    `,
  }),
  args: {
    search: true,
    removeRecords: true,
    dataSource: new StaticDataSource<TRow>([
      { name: 'Chris', age: 22, role: 'Author' },
      { name: 'Dennis', age: 45, role: 'Reviewer' },
      { name: 'aaa', age: 45, role: 'aaa' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: '1', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'Chris', age: 22, role: 'Author' },
      { name: 'Dennis', age: 45, role: 'Reviewer' },
      { name: 'aaa', age: 45, role: 'aaa' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: '2', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'Chris', age: 22, role: 'Author' },
      { name: 'Dennis', age: 45, role: 'Reviewer' },
      { name: 'aaa', age: 45, role: 'aaa' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: '3', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'zzzzz', age: 45, role: '4', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: '5', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'zzzzz', age: 45, role: '6', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: '7', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'zzzzz', age: 45, role: '8', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'bbbb', age: 45, role: 'bbb' },
      { name: 'zzzzz', age: 45, role: '9', function: '---' },
      { name: '1adada', age: 45, role: '2adasda', function: '21' },
      { name: 'zzzzz', age: 45, role: '10', function: '---' },
      { name: 'zzzzz', age: 45, role: '11', function: '21' }
    ])
  },
  argTypes: {
    search: {
      control: { type: 'boolean' }
    },
    removeRecords: {
      control: { type: 'boolean' }
    }
  },
};

export const TableDataStaticDataSourceEmpty: Story = {
  render: (args) => ({
    props: {
      ...args,
      rowClicked: (value: unknown) => {
        console.log(value);
      },
      buttonClick: (context: string) => {
        console.log(context);
      }
    },
    template: `
        <lib-table-dt
          ${argsToTemplate(args)},
          (rowClicked)="rowClicked($event)"
        >
          <lib-dt-col header="Name" key="name" class="hide-on-small">
            <ng-template libDtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Age" key="age" class="hide-on-small">
            <ng-template libDtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Role" key="role">
            <ng-template libDtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-col header="Function" key="function">
            <ng-template libDtTemplate let-value="value">
              {{ value }}
            </ng-template>
          </lib-dt-col>

          <lib-dt-action-col header="Action" key="action">
            <ng-template libDtTemplate>
              <a>
                <i class="bi bi-pencil" (click)="buttonClick('teste1')"></i>
              </a>
            </ng-template>
            <ng-template libDtTemplate>
              <a>
                <i class="bi bi-trash" (click)="buttonClick('teste2')"></i>
              </a>
            </ng-template>
          </lib-dt-action-col>
        </lib-table-dt>
    `,
  }),
  args: {
    search: true,
    removeRecords: true,
    dataSource: new StaticDataSource<TRow>([])
  },
  argTypes: {
    search: {
      control: { type: 'boolean' }
    },
    removeRecords: {
      control: { type: 'boolean' }
    }
  },
};
