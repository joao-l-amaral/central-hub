import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';
import { AlertComponent } from './alert-component';

const meta: Meta<AlertComponent> = {
    component: AlertComponent,
    title: 'AlertComponent',
};
export default meta;

type Story = StoryObj<AlertComponent>;

export const Simple: Story = {
    render: (args) => ({
        props: {
          ...args
        },
        template: `
          <lib-alert-component
            ${argsToTemplate(args)}
          ></lib-alert-component>
        `,
    }),
    args: {
      status: "info",
      title: "Operation completed successfully",
    },
};

export const WithSubtitle: Story = {
    render: (args) => ({
        props: {
          ...args
        },
        template: `
          <lib-alert-component
            ${argsToTemplate(args)}
          ></lib-alert-component>
        `,
    }),
    args: {
      status: "warning",
      title: "Storage almost full",
      subtitle: "You have used 90% of your available storage. Consider freeing up space.",
      dismissible: false
    },
};

export const Dismissible: Story = {
    render: (args) => ({
        props: {
          ...args,
            onClose: () => {
                alert(`Alert dismiss clicked`);
            },
        },
        template: `
          <lib-alert-component
            ${argsToTemplate(args)}
          ></lib-alert-component>
        `,
    }),
    args: {
      status: "danger",
      title: "An error occurred",
      subtitle: "Please try again or contact support.",
      dismissible: true,
      visible: true
    },
};
