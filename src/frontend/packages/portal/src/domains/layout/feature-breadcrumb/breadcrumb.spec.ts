import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb';
import { BreadcrumbStateService } from './breadcrumb-state';
import { I18nService } from '@portal-library';
import { vi } from 'vitest';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [
        {
          provide: BreadcrumbStateService,
          useValue: {
            breadcrumbPath: signal(['products', 'detail']),
          },
        },
        {
          provide: I18nService,
          useValue: { translate: vi.fn((value: string) => value) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
