import { ComponentFixture, TestBed } from '@angular/core/testing';
import {SharedApplicationConfigurations} from "@portal-library";
import {GameQComponent} from "./gameq.component";

describe('GameQComponent', () => {
  let component: GameQComponent;
  let fixture: ComponentFixture<GameQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [GameQComponent],
        providers: [
            SharedApplicationConfigurations
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameQComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

