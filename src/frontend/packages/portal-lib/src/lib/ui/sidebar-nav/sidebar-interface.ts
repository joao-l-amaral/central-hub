import {Type} from "@angular/core";

export interface ResourceConfig {
  visible?: boolean;
  label: string;
  id: string;
  url?: string;
  class: string;
  component: Type<unknown>
}
export interface PageResourcesComponentConfig {
  resources: ResourceConfig[];
}
