import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {ShelveProductsComponent} from "./app/pages/shelve-products.component";

bootstrapApplication(ShelveProductsComponent, appConfig).catch((err) => console.error(err));
