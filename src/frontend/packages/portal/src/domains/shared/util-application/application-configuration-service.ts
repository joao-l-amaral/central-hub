import {Injectable, signal} from "@angular/core";

@Injectable()
export class ApplicationConfigurationService {
    readonly isAuthActivate = signal<boolean>(false);
}
