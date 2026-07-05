import { applicationConfig, argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { SideBarNavigationComponent } from './sidebar-nav';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {I18nService} from "../../util-i18n/i18n-service";

@Component({
  selector: 'lib-sample',
  template: `<h1>Sample page</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSampleComponent {}

@Component({
  selector: 'lib-sample2',
  template: `<h1>Sample page 2</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSample2Component {}

const meta: Meta<SideBarNavigationComponent> = {
  component: SideBarNavigationComponent,
  title: 'SideBarNavigationComponent',
  decorators: [
    applicationConfig({
      providers: [I18nService],
    }),
  ],
};
export default meta;

type Story = StoryObj<SideBarNavigationComponent>;

export const SideBarNavInput: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="height: 250px">
        <lib-nav-panel
          ${argsToTemplate(args)}
        ></lib-nav-panel>
      </div>
    `,
  }),
  args: {
    resourceConfigurations: [
      {
        icon: 'bi bi-playstation',
        label: 'test.ps',
        component: PageSampleComponent,
      },
      {
        icon: 'bi bi-xbox',
        label: 'test.xbox',
        component: PageSample2Component,
      },
    ],
  },
  argTypes: {
    resourceConfigurations: {
      control: { type: 'object' },
    },
  },
};
