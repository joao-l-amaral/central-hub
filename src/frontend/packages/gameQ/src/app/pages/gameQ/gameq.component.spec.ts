import { ComponentFixture, TestBed } from '@angular/core/testing';
import {GameQComponent} from "./gameq.component";
import { I18nService } from '@central-hub/library';
import {provideToastr} from "ngx-toastr";

describe('GameQComponent', () => {
  let component: GameQComponent;
  let fixture: ComponentFixture<GameQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [GameQComponent],
        providers: [
          {
            provide: I18nService,
            useValue: { translate: vi.fn().mockReturnValue('translated') }
          },
          provideToastr({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          }),
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameQComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

