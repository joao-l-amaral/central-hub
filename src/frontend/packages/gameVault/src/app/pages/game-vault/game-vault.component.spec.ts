import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameVaultComponent } from './game-vault.component';
import {ApplicationConfigurations} from "@portal-library";

describe('GameVaultComponent', () => {
  let component: GameVaultComponent;
  let fixture: ComponentFixture<GameVaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [GameVaultComponent],
        providers: [
            ApplicationConfigurations
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameVaultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

