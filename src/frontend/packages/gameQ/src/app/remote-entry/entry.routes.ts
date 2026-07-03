import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { GameQComponent } from '../pages/gameQ/gameq.component';
import { I18nService, PageResourcesComponentConfig } from '@central-hub/library';
import { AdministrationComponent } from '../pages/administration/administration.component';
import { PageSampleComponent } from '../pages/pageSample/page-sample.component';
import { inject } from '@angular/core';

function resolverFn(
  route: ActivatedRouteSnapshot,
): PageResourcesComponentConfig {
  const i18n = inject(I18nService);

  const config: PageResourcesComponentConfig = {
    resources: [
      {
        icon: 'bi bi-playstation',
        label: i18n.translate('test.ps'),
        component: PageSampleComponent,
      },
      {
        icon: 'bi bi-xbox',
        label: i18n.translate('test.xbox'),
        component: AdministrationComponent,
      },
    ],
  };

  route.data = { config };
  return config;
}

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@central-hub/library').then((m) => m.SideBarNavigationComponent),
    // data: {
    //     config: {
    //         resources: [
    //             {
    //                 icon: "bi bi-playstation",
    //                 label: "test.ps",
    //                 component: PageSampleComponent
    //             },
    //             {
    //                 icon: "bi bi-xbox",
    //                 label: "test.xbox",
    //                 component: AdministrationComponent
    //             }
    //         ]
    //     } as PageResourcesComponentConfig
    // },
    children: [
      {
        path: '',
        component: GameQComponent,
      },
    ],
    resolve: {
      resolverFn,
    },
  },
];
