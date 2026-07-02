import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert-component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AlertComponentHarness } from './alert-component.harness';
import {expect} from "vitest";

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertComponentHarness: AlertComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('status', 'info');
    fixture.componentRef.setInput('title', 'title');

    alertComponentHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      AlertComponentHarness,
    );
  });

  it('Should create a AlertComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Check error icon based of status', () => {
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('status', 'danger');
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert__icon');
    expect(alert.classList.contains('bi-x-circle')).toBe(true);
  });

  it('Check warning icon based of status', () => {
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('status', 'warning');
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert__icon');
    expect(alert.classList.contains('bi-exclamation-triangle')).toBe(true);
  });

  it('Check info icon based of status', () => {
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('status', 'info');
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert__icon');
    expect(alert.classList.contains('bi-info-circle')).toBe(true);
  });

  it('Press dismiss button', async () => {
    const onCloseFn = vi.spyOn(component, 'onClose');
    fixture.componentRef.setInput('dismissible', true);

    await alertComponentHarness.clickDismissButton();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(onCloseFn).toBeCalledTimes(1);
  });

  it('Have subtitle', async () => {
    fixture.componentRef.setInput('subtitle', "subtitle");

    const subtitle = await alertComponentHarness.haveSubtitle();

    expect(subtitle).toEqual("subtitle");
  })
});
