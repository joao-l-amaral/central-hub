import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import {AuthApi, AuthState} from "@portal-library";
import { provideRouter } from '@angular/router';
import { ApplicationConfigurationService } from '../utils-application/application-configuration-service';

describe('NavComponent', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [Navbar],
        providers: [
            AuthApi,
            AuthState,
            provideRouter([]),
            ApplicationConfigurationService
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

