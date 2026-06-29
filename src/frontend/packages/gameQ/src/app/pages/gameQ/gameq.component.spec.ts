import { ComponentFixture, TestBed } from '@angular/core/testing';
import {GameQComponent} from "./gameq.component";
import { I18nService } from '@portal-library';

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
          }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameQComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

