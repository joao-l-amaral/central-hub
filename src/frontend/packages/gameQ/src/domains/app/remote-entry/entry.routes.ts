import { Route } from '@angular/router';
import { InitialSearchComponent } from '../../initial-search/initial-search';
import { provideConfiguration } from '../../initial-search/util-configuration/providers';

/*function resolverFn(
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
}*/

export const remoteRoutes: Route[] = [
  /*{
    path: '',
    component: SideBarNavigationComponent,
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
  },*/
  {
    path: '',
    component: InitialSearchComponent,
    providers: [provideConfiguration()],
    /* resolve: { //TODO add a resolver if a game/platform is selected it go to the dashboard page
      resolverFn,
    }, */
  },
];
