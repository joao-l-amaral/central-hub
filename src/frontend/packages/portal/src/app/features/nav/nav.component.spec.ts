import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import {AuthApi, AuthState} from "@portal-library";
import { provideRouter } from '@angular/router';
import { ApplicationConfigurationService } from '../../commons/services/application-configuration-service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [NavComponent],
        providers: [
            AuthApi,
            AuthState,
            provideRouter([]),
            ApplicationConfigurationService
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

