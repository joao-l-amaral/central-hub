import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { expect, vi } from 'vitest';
import { I18nService } from '../../util-i18n';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ConfirmationModalHarness } from '@central-hub/testing';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let confirmationModalHarness: ConfirmationModalHarness;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let dialogRef: MatDialogRef<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: vi.fn() },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Test Title', message: 'Test Message' },
        },
        {
          provide: I18nService,
          useValue: { translate: vi.fn().mockReturnValue('translated') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRef = TestBed.inject(MatDialogRef);

    confirmationModalHarness =
      await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        ConfirmationModalHarness,
      );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closing confirmation modal by pressing cancel button', async () => {
    await confirmationModalHarness.clickCancelButton();

    expect(dialogRef.close).toHaveBeenCalled();
  });
});
