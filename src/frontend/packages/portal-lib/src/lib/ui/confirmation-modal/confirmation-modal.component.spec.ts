import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { vi } from 'vitest';
import { I18nService } from '@portal-library';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: vi.fn() }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Test Title', message: 'Test Message' }
        },
        {
          provide: I18nService,
          useValue: { translate: vi.fn().mockReturnValue('translated') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

