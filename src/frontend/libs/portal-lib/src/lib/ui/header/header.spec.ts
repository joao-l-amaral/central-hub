import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderHarness } from '@central-hub/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { expect } from 'vitest';
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let headerHarness: HeaderHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('text', 'text');

    headerHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      HeaderHarness,
    );

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Icon should show in the element', async () => {
    fixture.componentRef.setInput('icon', 'bi bi-info-circle');
    const isIconPresent = await headerHarness.isIconPresent();
    expect(isIconPresent).toBeTruthy();
  });

  it('Icon shouldn\'t show in the element', async () => {
    fixture.componentRef.setInput('icon', "");
    const isIconPresent = await headerHarness.isIconPresent();
    expect(isIconPresent).toBeFalsy();
  });

  it('Subtitle should show in the element', async () => {
    fixture.componentRef.setInput('subText', "subtitle");
    const isSubtitlePresent = await headerHarness.isSubtitlePresent();
    expect(isSubtitlePresent).toBeTruthy();
  });

  it('Subtitle shouldn\'t show in the element', async () => {
    fixture.componentRef.setInput('subText', null);
    const isSubtitlePresent = await headerHarness.isSubtitlePresent();
    expect(isSubtitlePresent).toBeFalsy();
  });
});
