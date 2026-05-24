import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalLib } from './portal-lib';

describe('PortalLib', () => {
  let component: PortalLib;
  let fixture: ComponentFixture<PortalLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalLib],
    }).compileComponents();

    fixture = TestBed.createComponent(PortalLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
