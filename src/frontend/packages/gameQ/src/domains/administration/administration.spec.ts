import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Administration } from './administration';
import { provideToastr } from 'ngx-toastr';
import {
  I18nService,
  LoadingBlockService,
  RequestFactory,
} from '@central-hub/library';
import { GameQConfigurationState } from '../initial-search/util-configuration/configuration-state';
import { GameqAdministrationApi } from './data-access/gameq-administration-api';
import { MatDialog } from '@angular/material/dialog';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AdministrationHarness } from './administration.harness';
import { EditCardHarness } from './feature-edit-card/edit-card.harness';
import { Configurations } from '../../models/configurations-interface';
import { of } from 'rxjs';
import { expect } from 'vitest';

describe('AdministrationComponent', () => {
  const configurationsMock: Configurations = {
    platforms: [
      { platform: 'PlayStation', icon: 'bi bi-playstation' },
      { platform: 'Nintendo Switch', icon: 'bi bi-nintendo-switch' },
    ],
  };

  const gameqAdministrationApiMock = {
    getConfigurations: vi.fn().mockResolvedValue(configurationsMock),
    updateConfigurations: vi.fn().mockResolvedValue(undefined),
    updateSelectedConsole: vi.fn().mockResolvedValue(undefined),
    doSynchronizeGames: vi.fn().mockResolvedValue({
      message: 'ok',
      numberOfGamesImported: 0,
      numberOfPlatformsImported: 0,
    }),
  };

  let component: Administration;
  let fixture: ComponentFixture<Administration>;
  let harness: AdministrationHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Administration],
      providers: [
        {
          provide: RequestFactory,
          useValue: {
            get: vi.fn().mockReturnValue(
              of({ items: [], page: 1, pageSize: 50, totalCount: 0 }),
            ),
          },
        },
        GameQConfigurationState,
        LoadingBlockService,
        provideToastr({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
        {
          provide: I18nService,
          useValue: { translate: vi.fn().mockReturnValue('translated') },
        },
        {
          provide: MatDialog,
          useValue: {
            open: vi.fn().mockReturnValue({
              afterClosed: () => of(undefined),
            }),
          },
        },
      ],
    })
      .overrideComponent(Administration, {
        set: {
          providers: [
            { provide: GameqAdministrationApi, useValue: gameqAdministrationApiMock },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Administration);
    component = fixture.componentInstance;
  });

  describe('AdministrationHarness', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      harness = await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        AdministrationHarness,
      );
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('renders the header, actions and platform selector', async () => {
      expect(await harness.isHeaderVisible()).toBeTruthy();
      expect(await harness.isActionsVisible()).toBeTruthy();
      expect(await harness.isPlatformSelectorVisible()).toBeTruthy();
    });

    it('renders the configuration view (and not the edit card) by default', async () => {
      expect(await harness.isConfigurationVisible()).toBeTruthy();
      expect(await harness.isEditCardVisible()).toBeFalsy();
    });

    it('loads the configurations from the administration api', () => {
      expect(gameqAdministrationApiMock.getConfigurations).toHaveBeenCalled();
      expect(component.configurations().platforms).toHaveLength(2);
    });

    it('shows the edit card when the edit button is clicked', async () => {
      expect(await harness.isConfigurationVisible()).toBeTruthy();

      await harness.clickEditConfigurationButton();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(await harness.isEditCardVisible()).toBeTruthy();
      expect(await harness.isConfigurationVisible()).toBeFalsy();
    });

    it('returns to the configuration view when the edit card is cancelled', async () => {
      await harness.clickEditConfigurationButton();
      fixture.detectChanges();
      await fixture.whenStable();

      const editCardHarness = await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        EditCardHarness,
      );

      await editCardHarness.clickCancel();
      fixture.detectChanges();

      expect(await harness.isConfigurationVisible()).toBeTruthy();
      expect(await harness.isEditCardVisible()).toBeFalsy();
    });
  });
});