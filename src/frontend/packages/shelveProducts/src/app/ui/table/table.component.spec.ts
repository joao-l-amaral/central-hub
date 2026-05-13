import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import {StatisticsPanelService} from "../statistics-panel/statistics-panel.service";
import {ShelveProductService} from "../../data-source/shelve-product.service";
import {TableService} from "./table.service";
import {SideNavService} from "../../services/side-nav.service";
import {provideToastr} from "ngx-toastr";
import {ApplicationConfigurations, MF_FRONTEND} from "@portal-library";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [TableComponent],
        providers: [
            StatisticsPanelService,
            ShelveProductService,
            TableService,
            SideNavService,
            provideToastr({
                timeOut: 3000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
            }),
            ApplicationConfigurations,
            { provide: MF_FRONTEND, useValue: 'shelveProducts' }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

