import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {GameQComponent} from "./app/pages/gameQ/gameq.component";

bootstrapApplication(GameQComponent, appConfig).catch((err) => console.error(err));
