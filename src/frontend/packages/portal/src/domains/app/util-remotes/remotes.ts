export type RemoteStatus = 'unknown' | 'available' | 'unavailable';

export interface RemoteMeta {
  name: string;
  url: string;
  title: string;
  status: RemoteStatus;
}

export type RemotesConfig = RemoteMeta[];
