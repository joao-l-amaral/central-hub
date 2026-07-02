  import { ComponentFixture, TestBed } from '@angular/core/testing';
  import { KeyValueComponent } from './key-value.component';
  import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
  import { KeyValueHarness } from './key-value.harness';
  import {expect} from "vitest";

  describe('KeyValueComponent', () => {
    let component: KeyValueComponent;
    let keyValueHarness: KeyValueHarness;
    let fixture: ComponentFixture<KeyValueComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [KeyValueComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(KeyValueComponent);
      component = fixture.componentInstance;

      fixture.componentRef.setInput("label", "label");
      fixture.componentRef.setInput("value", "value");

      keyValueHarness = await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        KeyValueHarness,
      );
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Is sub level visible', async () => {
      fixture.componentRef.setInput("label", "label");
      fixture.componentRef.setInput("value", "value");
      fixture.componentRef.setInput("subLabel", "sub label");

      fixture.detectChanges();
      await fixture.whenStable();

      const subLabelIsVisible = await keyValueHarness.isSubLevelVisible();
      expect(subLabelIsVisible).toBeTruthy();
    });
  });
