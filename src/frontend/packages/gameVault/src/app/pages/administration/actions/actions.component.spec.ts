import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsComponent } from './actions.component';
import {GamePlatformApiService} from "../../../data-source/game-platform-api.service";
import {ApplicationConfigurations, MF_FRONTEND} from "@portal/library";
import {provideToastr} from "ngx-toastr";

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ActionsComponent],
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

    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

