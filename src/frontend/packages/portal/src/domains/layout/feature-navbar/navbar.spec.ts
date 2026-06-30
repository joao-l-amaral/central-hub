import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';
import { AuthApi, AuthState } from '@portal-library';
import { provideRouter } from '@angular/router';
import { ApplicationConfigurationService } from '../../shared/util-application/application-configuration-service';
import { REMOTES_CONFIG } from '../../shared/util-application/application-remotes-token';
import { signal } from '@angular/core';

describe('NavComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        AuthApi,
        AuthState,
        provideRouter([]),
        {
          provide: ApplicationConfigurationService,
          useValue: {
            isAuthActivate: signal(false)
          },
        },
        {
          provide: REMOTES_CONFIG,
          useValue: {
            products: { route: 'products' },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
