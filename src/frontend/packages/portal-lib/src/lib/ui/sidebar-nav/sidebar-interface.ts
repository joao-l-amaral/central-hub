import {Type} from "@angular/core";

export interface ResourceConfig {
  label: string;
  href?: string;
  icon: string;
  component: Type<unknown>
}
export interface PageResourcesComponentConfig {
  resources: ResourceConfig[];
}
