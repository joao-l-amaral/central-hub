import { ComponentFixture, TestBed } from '@angular/core/testing';
import {BreadcrumbStateService} from "./breadcrumb-state";
import { BreadcrumbComponent } from './breadcrumb';
import { vi } from 'vitest';
import { I18nService } from '@portal-library';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let breadcrumbStateService: BreadcrumbStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [BreadcrumbComponent],
        providers: [
            BreadcrumbStateService,
            {
              provide: I18nService,
              useValue: { translate: vi.fn().mockReturnValue('translated') }
            },
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    breadcrumbStateService = TestBed.inject(BreadcrumbStateService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty breadcrumb path', () => {
    expect(breadcrumbStateService.breadcrumbPath()).toEqual([]);
  });

  it('should set path segments on addPath', () => {
    breadcrumbStateService.addPath('/products/detail');
    expect(breadcrumbStateService.breadcrumbPath()).toEqual(['products', 'detail']);
  });

  it('should filter out empty segments', () => {
    breadcrumbStateService.addPath('/products/');
    expect(breadcrumbStateService.breadcrumbPath()).toEqual(['products']);
  });

  it('should handle root path "/"', () => {
    breadcrumbStateService.addPath('/');
    expect(breadcrumbStateService.breadcrumbPath()).toEqual([]);
  });

  it('should replace previous path on subsequent calls', () => {
    breadcrumbStateService.addPath('/products');
    breadcrumbStateService.addPath('/orders/detail');
    expect(breadcrumbStateService.breadcrumbPath()).toEqual(['orders', 'detail']);
  });

  it('should handle a single segment path', () => {
    breadcrumbStateService.addPath('/orders');
    expect(breadcrumbStateService.breadcrumbPath()).toEqual(['orders']);
  });
});

