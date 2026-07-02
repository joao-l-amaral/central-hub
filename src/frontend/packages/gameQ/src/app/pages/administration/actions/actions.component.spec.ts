import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsComponent } from './actions.component';
import {GamePlatformApiService} from "../../../data-source/game-platform-api.service";
import {provideToastr} from "ngx-toastr";
import { I18nService } from '@central-hub/library';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ActionsComponent],
        providers: [
            GamePlatformApiService,
            provideToastr({
                timeOut: 3000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
            }),
            {
              provide: I18nService,
              useValue: { translate: vi.fn().mockReturnValue('translated') }
            }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

