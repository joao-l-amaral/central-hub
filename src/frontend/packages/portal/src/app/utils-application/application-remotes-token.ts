import { InjectionToken } from '@angular/core';

export interface RemoteMeta {
  name: string;
  url: string;
  title: string;
}

export type RemotesConfig = RemoteMeta[];

export const REMOTES_CONFIG = new InjectionToken<RemotesConfig>('REMOTES_CONFIG');
