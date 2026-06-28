import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Portal } from './portal';
import {BreadcrumbStateService} from "../features/breadcrumb/breadcrumb-state";
import {AuthApi, AuthState} from "@portal-library";
import {provideRouter} from "@angular/router";
import {ApplicationConfigurationService} from "../utils-application/application-configuration-service";

describe('PortalComponent', () => {
  let component: Portal;
  let fixture: ComponentFixture<Portal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [Portal],
        providers: [
            BreadcrumbStateService,
            AuthApi,
            AuthState,
            provideRouter([]),
            ApplicationConfigurationService
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(Portal);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

