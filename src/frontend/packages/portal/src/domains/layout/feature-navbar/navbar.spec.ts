import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';
import { AuthApi, AuthState } from '@portal-library';
import { provideRouter } from '@angular/router';
import { ApplicationConfigurationService } from '../../shared/util-application/application-configuration-service';
import { REMOTES_CONFIG } from '../../shared/util-application/application-remotes-token';
import { expect } from 'vitest';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NavbarHarness } from '../../../../../../libs/testing/src/lib/navbar/navbar.harness';
import { signal, WritableSignal } from '@angular/core';

describe('NavComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarHarness: NavbarHarness;
  let isAuthActivateSignal: WritableSignal<boolean>;
  let isAuthStateSignal: WritableSignal<{
    isLoggedIn: boolean;
    userName: string;
    idToken: string;
  }>;
  let appConfigMock: { isAuthActivate: WritableSignal<boolean> };
  let authStateMock: {
    state: WritableSignal<{
      isLoggedIn: boolean;
      userName: string;
      idToken: string;
    }>;
  };
  let authApiMock: {
    doManualLogin: ReturnType<typeof vi.fn>;
    doManualLogout: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    isAuthActivateSignal = signal(false);
    isAuthStateSignal = signal({
      isLoggedIn: false,
      userName: '',
      idToken: '',
    });

    appConfigMock = {
      isAuthActivate: isAuthActivateSignal,
    };

    authStateMock = {
      state: isAuthStateSignal,
    };

    authApiMock = {
      doManualLogin: vi.fn(),
      doManualLogout: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]),
        {
          provide: REMOTES_CONFIG,
          useValue: [
            {
              name: 'remoteName',
              title: 'Remote title',
            },
          ],
        },
        {
          provide: ApplicationConfigurationService,
          useValue: appConfigMock,
        },
        {
          provide: AuthState,
          useValue: authStateMock,
        },
        {
          provide: AuthApi,
          useValue: authApiMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    navbarHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      NavbarHarness,
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login button is not present when auth is off', async () => {
    const isLoginButtonVisible = await navbarHarness.isLoginButtonVisible();
    expect(isLoginButtonVisible).toBeFalsy();
  });

  it('The login button is present when the auth is on and user is logged off', async () => {
    isAuthActivateSignal.set(true);

    fixture.detectChanges();

    const isLoginButtonVisible = await navbarHarness.isLoginButtonVisible();

    expect(isLoginButtonVisible).toBeTruthy();
  });

  it('Perform login action', async () => {
    isAuthActivateSignal.set(true);

    fixture.detectChanges();
    await fixture.whenStable();

    await navbarHarness.clickLoginButton();

    expect(authApiMock.doManualLogin).toHaveBeenCalledTimes(1);
  });

  it('The logout button is present when the auth is on and user is logged in', async () => {
    isAuthActivateSignal.set(true);
    isAuthStateSignal.set({
      isLoggedIn: true,
      userName: 'batatas',
      idToken: '12321312',
    });

    fixture.detectChanges();

    const isLogoutButtonVisible = await navbarHarness.isLogoutButtonVisible();
    expect(isLogoutButtonVisible).toBeTruthy();

    const logoutButtonText = await navbarHarness.getLogoutText();
    expect(logoutButtonText).toBe('batatas');
  });

  it('Perform logout action', async () => {
    isAuthActivateSignal.set(true);
    isAuthStateSignal.set({
      isLoggedIn: true,
      userName: 'batatas',
      idToken: '12321312',
    });

    fixture.detectChanges();
    await fixture.whenStable();

    await navbarHarness.clickLogoutButton();

    expect(authApiMock.doManualLogout).toHaveBeenCalledTimes(1);
  });
});
