import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {expect} from 'vitest';
import { TableDtComponent } from "./data-table";
import {DtTableHarness} from "@central-hub/testing";
import {LoadingBlockService} from "../loading-block/loading-block-service";
import { I18nService } from "../../util-i18n";
import {StaticDataSource, TRow} from "@central-hub/library";
import {Component, computed} from "@angular/core";
import {DataTableCell} from "./feature-data-table-cell/ui-cell/data-table-cell";
import {DtCellTemplateDirective} from "./util-data-table-commons/data-table-cell-template-directive";
import {ActionCell} from "./feature-data-table-cell/ui-action/action-cell";

@Component({
  selector: 'lib-test-table-with-actions',
  template: `
    <lib-table-dt [dataSource]="dataSource">
      <lib-dt-col header="Name" key="name">
        <ng-template libDtTemplate let-value="value">
          {{ value }}
        </ng-template>
      </lib-dt-col>

      <lib-dt-col header="Age" key="age">
        <ng-template libDtTemplate let-value="value">
          {{ value }}
        </ng-template>
      </lib-dt-col>

      <lib-dt-action-col header="Actions" key="actions">
        <ng-template libDtTemplate let-row="row">
          <a id="edit-{{ row?.id }}">
            <i class="bi bi-pencil"></i>
          </a>
        </ng-template>
        <ng-template libDtTemplate let-row="row">
          <a id="delete-{{ row?.id }}">
            <i class="bi bi-trash"></i>
          </a>
        </ng-template>
      </lib-dt-action-col>
    </lib-table-dt>
  `,
  imports: [TableDtComponent, DataTableCell, DtCellTemplateDirective, ActionCell],
  standalone: true
})
class TestTableWithActionsComponent {
  dataSource: any;
  constructor() {
    this.dataSource = new StaticDataSource<TRow>([]);
  }
}

@Component({
  selector: 'lib-test-table-sorting',
  template: `
    <lib-table-dt [dataSource]="dataSource">
      <lib-dt-col header="Name" key="name">
        <ng-template libDtTemplate let-value="value">
          {{ value }}
        </ng-template>
      </lib-dt-col>

      <lib-dt-col header="Age" key="age">
        <ng-template libDtTemplate let-value="value">
          {{ value }}
        </ng-template>
      </lib-dt-col>

      <lib-dt-col header="Role" key="role">
        <ng-template libDtTemplate let-value="value">
          {{ value }}
        </ng-template>
      </lib-dt-col>
    </lib-table-dt>
  `,
  imports: [TableDtComponent, DataTableCell, DtCellTemplateDirective],
  standalone: true
})
class TestTableSortingComponent {
  dataSource: any;
  constructor() {
    this.dataSource = new StaticDataSource<TRow>([]);
  }
}

describe('TableDtComponent', () => {
  let component: TableDtComponent;
  let fixture: ComponentFixture<TableDtComponent>;
  let dtTableHarness: DtTableHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDtComponent],
      providers: [
        LoadingBlockService,
        I18nService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableDtComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('dataSource', new StaticDataSource<TRow>([]));

    dtTableHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      DtTableHarness,
    );
  });

  it('Should create a TableDtComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a TableDtComponent if no data is present', () => {
    expect(dtTableHarness.isEmptyDataRowVisible()).toBeTruthy();
  });

  describe('Remove row actions', () => {
    beforeEach(async () => {
      fixture.componentRef.setInput('dataSource', new StaticDataSource<TRow>([
        { name: 'Chris', age: 22, role: 'Author' },
        { name: 'Dennis', age: 45, role: 'Reviewer' }
      ]));

      fixture.componentRef.setInput('removeRecords', true);
    });

    it('Show the row remove selection and bulk remote button', async () => {
      expect(await dtTableHarness.isRemoveButtonVisible()).toBeTruthy();
      expect(await dtTableHarness.isSelectAllRowsToRemoveInput()).toBeTruthy();
      expect(await dtTableHarness.isSelectRowToRemoveInput()).toBeTruthy();
    });

    it('Select single row to delete', async () => {
      await dtTableHarness.selectSingleRowToRemove();
      const selectedRowsToRemove = component.selectedRowsToRemove();

      expect(selectedRowsToRemove.length).toBeGreaterThanOrEqual(1);
    });

    it('Select all rows', async () => {
      await dtTableHarness.selectAllRowsToRemoveInput();
      expect(await dtTableHarness.isSelectAllRowsToRemoveChecked()).toBeTruthy();
    });

    it('Delete row', async () => {
      await dtTableHarness.selectAllRowsToRemoveInput();
      await dtTableHarness.removeSelectedRow();

      fixture.detectChanges();

      expect(await dtTableHarness.isEmptyDataRowVisible()).toBeTruthy();
    });
  });

  describe('Filter rows by search', () => {
    beforeEach(async () => {
      fixture.componentRef.setInput('dataSource', new StaticDataSource<TRow>([
        { name: 'Chris', age: 22, role: 'Author' },
        { name: 'Dennis', age: 45, role: 'Reviewer' }
      ]));

      fixture.componentRef.setInput('search', true);
    });

    it('Filter rows with search term', async () => {
      component.onSearch('Chris');
      expect(await dtTableHarness.getRowsLength()).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Action Columns', () => {
    let actionFixture: ComponentFixture<TestTableWithActionsComponent>;
    let actionComponent: TestTableWithActionsComponent;

    beforeEach(async () => {
      TestBed.resetTestingModule();

      await TestBed.configureTestingModule({
        imports: [TestTableWithActionsComponent, TableDtComponent, DataTableCell, ActionCell, DtCellTemplateDirective],
        providers: [
          LoadingBlockService,
          I18nService
        ]
      }).compileComponents();

      actionFixture = TestBed.createComponent(TestTableWithActionsComponent);
      actionComponent = actionFixture.componentInstance;
      actionFixture.detectChanges();
    });

    it('Should instantiate component with action columns', () => {
      expect(actionComponent).toBeTruthy();
    });

    it('Should detect action columns from template', () => {
      const tableComponent = actionFixture.debugElement.query(e => e.name === 'lib-table-dt')?.componentInstance as TableDtComponent;
      const actionCols = tableComponent.actionColumns();

      expect(actionCols.length).toBeGreaterThan(0);
    });

    it('Should include action columns in the columns computed signal', () => {
      const tableComponent = actionFixture.debugElement.query(e => e.name === 'lib-table-dt')?.componentInstance as TableDtComponent;
      const columns = tableComponent.columns();
      const dataColumns = tableComponent.dataColumns();
      const actionColumns = tableComponent.actionColumns();

      expect(columns.length).toEqual(dataColumns.length + actionColumns.length);
    });

    it('Should have action column header and key configured', () => {
      const tableComponent = actionFixture.debugElement.query(e => e.name === 'lib-table-dt')?.componentInstance as TableDtComponent;
      const actionCols = tableComponent.actionColumns();

      expect(actionCols[0].header()).toEqual('Actions');
      expect(actionCols[0].key()).toEqual('actions');
    });

    it('Should have action templates defined', () => {
      const tableComponent = actionFixture.debugElement.query(e => e.name === 'lib-table-dt')?.componentInstance as TableDtComponent;
      const actionCols = tableComponent.actionColumns();
      const actions = actionCols[0].actions();

      expect(actions.length).toEqual(2);
    });
  });

  describe('Select row', () => {
    beforeEach(async () => {
      fixture.componentRef.setInput('dataSource', new StaticDataSource<TRow>([
        { name: 'Chris', age: 22, role: 'Author' },
        { name: 'Dennis', age: 45, role: 'Reviewer' }
      ]));

      fixture.componentRef.setInput('search', true);
    });

    it('Select and unselect rows', async () => {
      await dtTableHarness.pressFirstRow();
      fixture.detectChanges();

      expect(component.rowSelected()).toEqual({ id: 0, name: 'Chris', age: 22, role: 'Author' });

      await dtTableHarness.pressFirstRow();
      fixture.detectChanges();

      expect(component.rowSelected()).toEqual({});

    });
  });
});
