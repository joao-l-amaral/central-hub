import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {GameVaultComponent} from "./app/pages/game-vault/game-vault.component";

bootstrapApplication(GameVaultComponent, appConfig).catch((err) => console.error(err));
