import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoteEntry } from './entry';
import {ApplicationConfigurations} from "@portal-library";

describe('RemoteEntry', () => {
  let component: RemoteEntry;
  let fixture: ComponentFixture<RemoteEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [RemoteEntry],
        providers: [
            ApplicationConfigurations
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoteEntry);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

