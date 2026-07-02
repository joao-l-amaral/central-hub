import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CircleComponent } from './circle-component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CircleComponentHarness } from '../../../../../../libs/testing/src/lib/circle-component/circle-component.harness';
import {expect} from "vitest";

describe('CircleComponent', () => {
  let component: CircleComponent;
  let fixture: ComponentFixture<CircleComponent>;
  let circleComponentHarness: CircleComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CircleComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput("id", "123");

    circleComponentHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      CircleComponentHarness,
    );
  });

  it('Should create a CircleComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should the color be primary if selected', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();

    const circle = fixture.nativeElement.querySelector('.circle-container');
    expect(circle.classList.contains('selected')).toBe(true);
  });

  it('Should the color be neutral if not selected', () => {
    fixture.componentRef.setInput('selected', false);
    fixture.detectChanges();

    const circle = fixture.nativeElement.querySelector('.circle-container');
    expect(circle.classList.contains('unselected')).toBe(true);
  });

  it('Should trigger the function if selected', async () => {
    const onActionFn = vi.spyOn(component, 'onAction');
    let clickedEmitted = '';

    fixture.componentRef.setInput('id', 'batatas');
    fixture.componentRef.setInput('selected', true);

    component.clicked.subscribe((value) => {
      clickedEmitted = value;
    });

    fixture.componentInstance.onAction();
    fixture.detectChanges();

    expect(clickedEmitted).toBe('batatas');

    expect(onActionFn).toHaveBeenCalledTimes(1);
  });

  it('Does label appear', async () => {
    fixture.componentRef.setInput('label', "label");

    const isLabelVisible = await circleComponentHarness.isLabelVisible();

    expect(isLabelVisible).toBeTruthy();
  });
});
