import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalComponent } from './portal.component';
import {BreadcrumbStateService} from "./features/breadcrumb/breadcrumb-state";
import {AuthApi, AuthState} from "@portal-library";
import {provideRouter} from "@angular/router";
import {ApplicationConfigurationService} from "./commons/services/application-configuration-service";

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [PortalComponent],
        providers: [
            BreadcrumbStateService,
            AuthApi,
            AuthState,
            provideRouter([]),
            ApplicationConfigurationService
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

