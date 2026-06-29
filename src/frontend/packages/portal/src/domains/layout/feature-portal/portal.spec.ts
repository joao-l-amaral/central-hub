import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalComponent } from './portal';
import { AuthApi, AuthState, I18nService } from '@portal-library';
import { provideRouter, Router } from '@angular/router';
import { BreadcrumbStateService } from '../feature-breadcrumb/breadcrumb-state';
import { ApplicationConfigurationService } from '../../shared/util-application/application-configuration-service';
import { REMOTES_CONFIG } from '../../shared/util-application/application-remotes-token';
import { vi } from 'vitest';
import { provideZonelessChangeDetection, signal } from '@angular/core';

describe('PortalComponent - router tracker', () => {
  let fixture: ComponentFixture<PortalComponent>;
  let router: Router;
  let breadcrumbService: BreadcrumbStateService;

  const breadcrumbStateMock = {
    addPath: vi.fn(),
    breadcrumbPath: signal<string[]>([])
  };

  beforeEach(async () => {
    breadcrumbStateMock.addPath.mockReset();

    await TestBed.configureTestingModule({
      imports: [PortalComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        AuthApi,
        AuthState,
        ApplicationConfigurationService,
        {
          provide: REMOTES_CONFIG,
          useValue: [{ name: 'products', route: 'products' }]
        },
        {
          provide: I18nService,
          useValue: { translate: vi.fn().mockReturnValue('translated') }
        },
        {
          provide: BreadcrumbStateService,
          useValue: breadcrumbStateMock
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    breadcrumbService = TestBed.inject(BreadcrumbStateService);

    fixture = TestBed.createComponent(PortalComponent);
    fixture.detectChanges();
  });

  it('calls addPath when navigating', async () => {
    await router.navigate(['/']);
    fixture.detectChanges();

    expect(breadcrumbService.addPath).toHaveBeenCalledWith('/');
  });

  it('does not call addPath before any navigation', () => {
    expect(breadcrumbService.addPath).not.toHaveBeenCalled();
  });
});
