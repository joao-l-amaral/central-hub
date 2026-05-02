import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxWelcome } from './nx-welcome';
import {ApplicationConfigurations} from "@portal/library";

describe('NxWelcome', () => {
  let component: NxWelcome;
  let fixture: ComponentFixture<NxWelcome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [NxWelcome],
        providers: [
            ApplicationConfigurations
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(NxWelcome);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

