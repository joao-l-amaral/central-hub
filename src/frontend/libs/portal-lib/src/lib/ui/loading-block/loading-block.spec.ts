import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {expect} from 'vitest';
import {LoadingBlockHarness} from "@central-hub/testing";
import { LoadingBlockComponent } from "./loading-block";
import {LoadingBlockService} from "./loading-block-service";

describe('LoadingBlockComponent', () => {
  let component: LoadingBlockComponent;
  let fixture: ComponentFixture<LoadingBlockComponent>;
  let loadingBlockHarness: LoadingBlockHarness;
  let loadingBlockService: LoadingBlockService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBlockComponent],
      providers: [LoadingBlockService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingBlockComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('loading', true);

    loadingBlockHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      LoadingBlockHarness,
    );

    loadingBlockService = TestBed.inject(LoadingBlockService);
  });

  it('Should create a LoadingBlockComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the loading indicator when isLoading is true', async () => {
    const isLoading = await loadingBlockHarness.isLoading();
    expect(isLoading).toBe(true);
  });

  describe('Set loading state via service', () => {
    beforeEach(async () => {
      fixture.componentRef.setInput('loading', false);
    })

    it('Show loading state', async () => {
      loadingBlockService.show();

      expect(await loadingBlockHarness.isLoading()).toBeTruthy();
    });

    it('Hide loading state', async () => {
      loadingBlockService.hide();

      expect(await loadingBlockHarness.isLoading()).toBeFalsy();
    });

  })

});
