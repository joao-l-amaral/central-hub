import { TestBed } from '@angular/core/testing';
import { BreadcrumbStateService } from './breadcrumb-state';

describe('BreadcrumbStateService', () => {
  let service: BreadcrumbStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbStateService],
    });

    service = TestBed.inject(BreadcrumbStateService);
  });

  it('should initialize with an empty breadcrumb path', () => {
    expect(service.breadcrumbPath()).toEqual([]);
  });

  it('should set path segments on addPath', () => {
    service.addPath('/products/detail');
    expect(service.breadcrumbPath()).toEqual(['products', 'detail']);
  });

  it('should filter out empty segments', () => {
    service.addPath('/products/');
    expect(service.breadcrumbPath()).toEqual(['products']);
  });

  it('should handle root path "/"', () => {
    service.addPath('/');
    expect(service.breadcrumbPath()).toEqual([]);
  });

  it('should replace previous path on subsequent calls', () => {
    service.addPath('/products');
    service.addPath('/orders/detail');
    expect(service.breadcrumbPath()).toEqual(['orders', 'detail']);
  });

  it('should handle a single segment path', () => {
    service.addPath('/orders');
    expect(service.breadcrumbPath()).toEqual(['orders']);
  });
});
