import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationComponent } from './configuration.component';
import {GamePlatformApiService} from "../../../data-source/game-platform-api.service";
import {ApplicationConfigurations, MF_FRONTEND} from "@portal-library";
import {provideToastr} from "ngx-toastr";

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ConfigurationComponent],
        providers: [
            GamePlatformApiService,
            ApplicationConfigurations,
            provideToastr({
                timeOut: 3000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
            }),
            { provide: MF_FRONTEND, useValue: 'gameVault' }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

