import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions } from './actions';
import { provideToastr } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { I18nService } from '@central-hub/library';
import { GameqAdministrationApi } from '../data-access/gameq-administration-api';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ActionsHarness } from './actions.harness';
import { expect } from 'vitest';

interface ForceGamesUpdateResponse {
  message: string;
  numberOfGamesImported: number;
  numberOfPlatformsImported: number;
}

describe('ActionsComponent', () => {
  const gameqAdministrationApiMock = {
    doSynchronizeGames: vi.fn(),
  };

  const toastrMock = {
    success: vi.fn(),
    error: vi.fn(),
  };

  let component: Actions;
  let fixture: ComponentFixture<Actions>;
  let harness: ActionsHarness;

  beforeEach(async () => {
    gameqAdministrationApiMock.doSynchronizeGames.mockReset();
    toastrMock.success.mockReset();
    toastrMock.error.mockReset();

    await TestBed.configureTestingModule({
      imports: [Actions],
      providers: [
        { provide: GameqAdministrationApi, useValue: gameqAdministrationApiMock },
        { provide: ToastrService, useValue: toastrMock },
        provideToastr({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
        {
          provide: I18nService,
          useValue: { translate: vi.fn().mockReturnValue('translated') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Actions);
    fixture.detectChanges();

    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      ActionsHarness,
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the force games update button', async () => {
    expect(await harness.hasForceUpdateButton()).toBeTruthy();
  });

  it('calls the synchronize games endpoint when the update button is clicked', async () => {
    gameqAdministrationApiMock.doSynchronizeGames.mockResolvedValue({
      message: 'ok',
      numberOfGamesImported: 2,
      numberOfPlatformsImported: 1,
    });

    await harness.clickForceUpdate();
    await fixture.whenStable();

    expect(gameqAdministrationApiMock.doSynchronizeGames).toHaveBeenCalledTimes(
      1,
    );
  });

  it('shows the loading state while the update is pending', async () => {
    let resolveUpdate: (value: ForceGamesUpdateResponse) => void;
    gameqAdministrationApiMock.doSynchronizeGames.mockReturnValue(
      new Promise((resolve) => {
        resolveUpdate = resolve;
      }),
    );

    await harness.clickForceUpdate();
    fixture.detectChanges();

    expect(await harness.isForceUpdateLoading()).toBeTruthy();

    resolveUpdate!({
      message: 'ok',
      numberOfGamesImported: 2,
      numberOfPlatformsImported: 1,
    });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(await harness.isForceUpdateLoading()).toBeFalsy();
  });

  it('shows a success toast with the sync message when the update finishes', async () => {
    gameqAdministrationApiMock.doSynchronizeGames.mockResolvedValue({
      message: 'Database updated',
      numberOfGamesImported: 2,
      numberOfPlatformsImported: 1,
    });

    await harness.clickForceUpdate();
    await fixture.whenStable();

    expect(toastrMock.success).toHaveBeenCalledWith('Database updated');
  });

  it('shows a success toast with the imported counters when no message is returned', async () => {
    gameqAdministrationApiMock.doSynchronizeGames.mockResolvedValue({
      message: '',
      numberOfGamesImported: 3,
      numberOfPlatformsImported: 1,
    });

    await harness.clickForceUpdate();
    await fixture.whenStable();

    expect(toastrMock.success).toHaveBeenCalledWith(
      `Platforms: 1, Games: 3`,
    );
  });
});