import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { expect } from 'vitest';
import { ButtonHarness } from '../../../../../../libs/testing/src/lib/button/button.harness';
import { ButtonComponent } from './button';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonHarness: ButtonHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

    buttonHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      ButtonHarness,
    );
  });

  it('Should create a ButtonComponent', () => {
    expect(component).toBeTruthy();
  });

  it('the button is in loading state', async () => {
    fixture.componentRef.setInput("loading", true);

    const isLoading = await buttonHarness.isLoading();

    expect(isLoading).toBeTruthy();
  })

  it('Button icon is showing', async () => {
    fixture.componentRef.setInput("icon", "teste");

    const isLoading = await buttonHarness.isLoading();
    const haveIcon = await buttonHarness.haveIcon();

    expect(isLoading).toBeFalsy();
    expect(haveIcon).toBeTruthy();
  })

  it('Button have label', async () => {
    fixture.componentRef.setInput("label", "teste");

    const isLoading = await buttonHarness.isLoading();
    const label = await buttonHarness.getLabelText();

    expect(isLoading).toBeFalsy();
    expect(label).toEqual("teste");
  })
});
