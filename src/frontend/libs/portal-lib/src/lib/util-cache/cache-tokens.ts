import { HttpContextToken } from '@angular/common/http';

export const CACHE_CONTEXT = new HttpContextToken<boolean>(() => false);
