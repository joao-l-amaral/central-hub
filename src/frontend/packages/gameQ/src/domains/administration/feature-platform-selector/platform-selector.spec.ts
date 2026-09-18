import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformSelectorComponent } from './platform-selector';
import { provideToastr } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import {
  I18nService,
  LoadingBlockService,
  RequestFactory,
} from '@central-hub/library';
import { GameqAdministrationApi } from '../data-access/gameq-administration-api';
import { GameQConfigurationState } from '../../initial-search/util-configuration/configuration-state';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { PlatformSelectorHarness } from './platform-selector.harness';
import { DtTableHarness } from '@central-hub/testing';
import { PaginationPage } from '@central-hub/library';
import { of } from 'rxjs';
import { expect } from 'vitest';

describe('PlatformSelectorComponent', () => {
  const requestFactoryMock = {
    get: vi.fn(),
  };

  const gameqAdministrationApiMock = {
    updateSelectedConsole: vi.fn(),
  };

  const toastrMock = {
    success: vi.fn(),
    error: vi.fn(),
  };

  let component: PlatformSelectorComponent;
  let fixture: ComponentFixture<PlatformSelectorComponent>;
  let gameQConfigurationState: GameQConfigurationState;

  beforeEach(async () => {
    requestFactoryMock.get.mockReset();
    gameqAdministrationApiMock.updateSelectedConsole.mockReset();

    await TestBed.configureTestingModule({
      imports: [PlatformSelectorComponent],
      providers: [
        { provide: RequestFactory, useValue: requestFactoryMock },
        { provide: GameqAdministrationApi, useValue: gameqAdministrationApiMock },
        { provide: ToastrService, useValue: toastrMock },
        GameQConfigurationState,
        LoadingBlockService,
        {
          provide: I18nService,
          useValue: { translate: vi.fn().mockReturnValue('translated') },
        },
        provideToastr({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformSelectorComponent);
    component = fixture.componentInstance;
    gameQConfigurationState = TestBed.inject(GameQConfigurationState);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the platforms table', async () => {
    const harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      PlatformSelectorHarness,
    );

    expect(await harness.isTableVisible()).toBeTruthy();
  });

  it('loads the selected platforms from the backend', async () => {
    requestFactoryMock.get.mockReturnValue(
      of<PaginationPage<unknown>>({
        items: [
          {
            platformName: 'PlayStation',
            icon: 'bi bi-playstation',
            selected: false,
          },
          {
            platformName: 'Nintendo',
            icon: 'bi bi-nintendo-switch',
            selected: true,
          },
        ],
        page: 1,
        pageSize: 50,
        totalCount: 2,
      }),
    );

    component.dataSource.setPageSize(50);
    await new Promise((resolve) => setTimeout(resolve, 350));
    fixture.detectChanges();

    const tableHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      DtTableHarness,
    );

    expect(requestFactoryMock.get).toHaveBeenCalledWith(
      '/api/gameq/administration/selectedPlatforms',
      expect.objectContaining({ params: expect.anything() }),
    );
    expect(await tableHarness.getRowsLength()).toBe(2);
  });

  it('toggles the platform import status and reloads the data source when a row is clicked', async () => {
    gameqAdministrationApiMock.updateSelectedConsole.mockResolvedValue(
      undefined,
    );
    const updatePlatformStatusSpy = vi.spyOn(
      gameQConfigurationState,
      'updatePlatformStatus',
    );
    const reloadSpy = vi.spyOn(component.dataSource, 'reload');

    requestFactoryMock.get.mockReturnValue(
      of<PaginationPage<unknown>>({
        items: [
          {
            platformName: 'PlayStation',
            icon: 'bi bi-playstation',
            selected: false,
          },
        ],
        page: 1,
        pageSize: 50,
        totalCount: 1,
      }),
    );

    component.dataSource.setPageSize(50);
    await new Promise((resolve) => setTimeout(resolve, 350));
    fixture.detectChanges();

    const tableHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      DtTableHarness,
    );

    expect(await tableHarness.getRowsLength()).toBe(1);

    await tableHarness.pressFirstRow();
    await fixture.whenStable();

    expect(gameqAdministrationApiMock.updateSelectedConsole).toHaveBeenCalledWith(
      'PlayStation',
      true,
    );
    expect(updatePlatformStatusSpy).toHaveBeenCalledWith('PlayStation', true);
    expect(reloadSpy).toHaveBeenCalled();
  });
});