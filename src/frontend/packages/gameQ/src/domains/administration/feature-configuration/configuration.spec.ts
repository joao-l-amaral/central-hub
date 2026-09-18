import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Configuration } from './configuration';
import { provideToastr } from 'ngx-toastr';
import { I18nService } from '@central-hub/library';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ConfigurationHarness } from './configuration.harness';
import { Configurations } from '../../../models/configurations-interface';
import { expect } from 'vitest';

describe('ConfigurationComponent', () => {
  let component: Configuration;
  let fixture: ComponentFixture<Configuration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Configuration],
      providers: [
        provideToastr({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
        {
          provide: I18nService,
          useValue: { translate: vi.fn().mockReturnValue('translated') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Configuration);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ConfigurationHarness', () => {
    let harness: ConfigurationHarness;

    it('renders a collapsable with no platforms when the configuration is empty', async () => {
      fixture.componentRef.setInput('configuration', {
        platforms: [],
      } satisfies Configurations);
      fixture.detectChanges();

      harness = await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        ConfigurationHarness,
      );

      expect(await harness.isCollapsableVisible()).toBeTruthy();
      expect(await harness.getPlatformsCount()).toBe(0);
    });

    it('renders one key-value entry per configured platform', async () => {
      fixture.componentRef.setInput('configuration', {
        platforms: [
          { platform: 'PlayStation', icon: 'bi bi-playstation' },
          { platform: 'Xbox', icon: 'bi bi-xbox' },
          { platform: 'Nintendo Switch', icon: 'bi bi-nintendo-switch' },
        ],
      } satisfies Configurations);
      fixture.detectChanges();

      harness = await TestbedHarnessEnvironment.harnessForFixture(
        fixture,
        ConfigurationHarness,
      );

      expect(await harness.isCollapsableVisible()).toBeTruthy();
      expect(await harness.getPlatformsCount()).toBe(3);
    });
  });
});
