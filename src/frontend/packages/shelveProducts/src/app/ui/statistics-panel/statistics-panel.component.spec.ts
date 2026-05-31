import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsPanelComponent } from './statistics-panel.component';
import {StatisticsPanelService} from "./statistics-panel.service";
import {ShelveProductService} from "../../data-source/shelve-product.service";
import {SharedApplicationConfigurations, MF_FRONTEND} from "@portal-library";

describe('StatisticsPanelComponent', () => {
  let component: StatisticsPanelComponent;
  let fixture: ComponentFixture<StatisticsPanelComponent>;

  beforeEach(async () => {
    const mockShelveProductService = {
        getShelveProduct: vi.fn(() => Promise.resolve([]))
    };
    const mockStatisticsPanelService = {
        getStatistics: vi.fn(() => {
            /* no return */
        })
    };

    await TestBed.configureTestingModule({
        imports: [StatisticsPanelComponent],
        providers: [
            SharedApplicationConfigurations,
            { provide: MF_FRONTEND, useValue: 'shelveProducts' },
            { provide: ShelveProductService, useValue: mockShelveProductService },
            { provide: StatisticsPanelService, useValue: mockStatisticsPanelService }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsPanelComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

