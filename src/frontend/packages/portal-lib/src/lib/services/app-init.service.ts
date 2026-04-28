import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { I18nService } from './i18n.service';
import { firstValueFrom, shareReplay } from 'rxjs';
import { ApplicationConfigurations } from './application-configurations.service';

type MapEntry = Record<string, string>;

@Injectable()
export class AppInitService {

    private readonly i18nService = inject(I18nService);
    private readonly httpClient = inject(HttpClient);
    private readonly applicationConfigurations = inject(ApplicationConfigurations);

    private checkLanguage(language: string): string {
        return language === 'pt' || language === 'en' ? language : 'en';
    }

    private getLanguageDic(language: string, namespace: string) {
        return firstValueFrom(this.httpClient.get<MapEntry>(`./assets/${namespace}/i18n/messages-${language}.json`).pipe(shareReplay(1)));
    }

    private getApplicationConfiguration() {
        return firstValueFrom(this.httpClient.get<MapEntry>(`./assets/bff.config.json`).pipe(shareReplay(1)));
    }

    async fetchI18nData(namespace: string) {
        const language = this.checkLanguage(navigator.language);
        const data = await this.getLanguageDic(language, namespace);
        const tempMap = new Map<string, string>;

        Object.keys(data).forEach(key => {
            tempMap.set(key, data[key]);
        });

        this.i18nService.addMap(tempMap, namespace);
    }

    async fetchApplicationConfiguration() {
        console.log("Fetch bff token from portal configuration.");

        const applicationConfiguration = await this.getApplicationConfiguration();

        const bffBasicAuthPass = applicationConfiguration["bff.auth.pass"];

        if(bffBasicAuthPass && bffBasicAuthPass.length > 0) {
            const applicationConfigurationAuthPass = btoa(bffBasicAuthPass);

            this.applicationConfigurations.basicAuthenticationToken.set(applicationConfigurationAuthPass);
        }
    }

    fetchPortalInternalization() {
        this.fetchI18nData('').then(() => {
            console.info('Fetched i18n data from portal');
        })
    }

}
