import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCard } from './edit-card';
import { provideToastr } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { I18nService } from '@central-hub/library';
import { GameqAdministrationApi } from '../data-access/gameq-administration-api';
import { MatDialog } from '@angular/material/dialog';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { EditCardHarness } from './edit-card.harness';
import { of } from 'rxjs';
import { expect } from 'vitest';

describe('EditCardComponent', () => {
  const i18nMock = { translate: vi.fn().mockReturnValue('translated') };
  const gameqAdministrationApiMock = {
    updateConfigurations: vi.fn().mockResolvedValue(undefined),
  };
  const toastrMock = {
    success: vi.fn(),
    error: vi.fn(),
  };
  const dialogMock = {
    open: vi.fn(),
  };

  let component: EditCard;
  let fixture: ComponentFixture<EditCard>;
  let harness: EditCardHarness;

  beforeEach(async () => {
    gameqAdministrationApiMock.updateConfigurations.mockReset();
    gameqAdministrationApiMock.updateConfigurations.mockResolvedValue(undefined);
    toastrMock.success.mockReset();
    dialogMock.open.mockReset();
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(undefined),
    });

    await TestBed.configureTestingModule({
      imports: [EditCard],
      providers: [
        { provide: GameqAdministrationApi, useValue: gameqAdministrationApiMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: I18nService, useValue: i18nMock },
        provideToastr({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCard);
    component = fixture.componentInstance;
    fixture.detectChanges();

    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      EditCardHarness,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the format, cancel and save buttons', async () => {
    expect(await harness.getTextAreaValue()).toBe('{\n  \n}');
  });

  describe('JSON editing', () => {
    it('formats the provided configuration and loads it into the textarea', async () => {
      fixture.componentRef.setInput(
        'configuration',
        '{"a":1,"b":{"c":2}}',
      );
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(await harness.getTextAreaValue()).toBe(
        '{\n  "a": 1,\n  "b": {\n    "c": 2\n  }\n}',
      );
    });

    it('shows an error when the typed json is invalid', async () => {
      await harness.setTextAreaValue('{ invalid json');
      fixture.detectChanges();

      expect(await harness.isErrorVisible()).toBeTruthy();
      expect(await harness.getErrorMessage()).toContain('position');
      expect(component.errorLine()).not.toBeNull();
    });

    it('clears the error when the typed json is valid again', async () => {
      await harness.setTextAreaValue('{ invalid json');
      fixture.detectChanges();
      expect(await harness.isErrorVisible()).toBeTruthy();

      await harness.setTextAreaValue('{"valid":true}');
      fixture.detectChanges();

      expect(await harness.isErrorVisible()).toBeFalsy();
      expect(component.errorLine()).toBeNull();
    });

    it('highlights the line that contains the json error', async () => {
      await harness.setTextAreaValue(
        '{\n  "a": 1,\n  broken,\n  "b": 2\n}',
      );
      fixture.detectChanges();

      expect(await harness.getHighlightedErrorLinesCount()).toBe(1);
    });

    it('formats a valid json when the format button is clicked', async () => {
      await harness.setTextAreaValue('{"a":1,"b":2}');
      fixture.detectChanges();

      await harness.clickFormat();
      fixture.detectChanges();

      expect(await harness.getTextAreaValue()).toBe(
        '{\n  "a": 1,\n  "b": 2\n}',
      );
    });
  });

  describe('Save & cancel', () => {
    it('emits changeConfigurationStatus when cancel is clicked', async () => {
      const onChangeStatus = vi.fn();
      component.changeConfigurationStatus.subscribe(onChangeStatus);

      await harness.clickCancel();

      expect(onChangeStatus).toHaveBeenCalledTimes(1);
    });

    it('opens the confirmation dialog, saves the configuration and shows a success toast', async () => {
      const confirmedDialogRef = {
        afterClosed: () => of({ confirmed: true }),
      };
      dialogMock.open.mockReturnValue(confirmedDialogRef);

      await harness.setTextAreaValue('{"a":1}');
      fixture.detectChanges();

      await harness.clickSave();
      await fixture.whenStable();

      expect(dialogMock.open).toHaveBeenCalledTimes(1);
      expect(
        gameqAdministrationApiMock.updateConfigurations,
      ).toHaveBeenCalledWith({ a: 1 });
      expect(toastrMock.success).toHaveBeenCalledWith('translated');
    });

    it('does not save the configuration when the dialog is dismissed', async () => {
      const dismissedDialogRef = {
        afterClosed: () => of(undefined),
      };
      dialogMock.open.mockReturnValue(dismissedDialogRef);

      await harness.setTextAreaValue('{"a":1}');
      fixture.detectChanges();

      await harness.clickSave();
      await fixture.whenStable();

      expect(
        gameqAdministrationApiMock.updateConfigurations,
      ).not.toHaveBeenCalled();
    });
  });
});
