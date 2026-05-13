import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import {TableService} from "../table/table.service";
import {SideNavService} from "../../services/side-nav.service";
import {provideToastr} from "ngx-toastr";
import {StatisticsPanelService} from "../statistics-panel/statistics-panel.service";
import {ShelveProductService} from "../../data-source/shelve-product.service";
import {ApplicationConfigurations, MF_FRONTEND} from "@portal-library";

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [FormComponent],
        providers: [
            TableService,
            SideNavService,
            provideToastr({
                timeOut: 3000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
            }),
            StatisticsPanelService,
            ShelveProductService,
            ApplicationConfigurations,
            { provide: MF_FRONTEND, useValue: 'shelveProducts' }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

