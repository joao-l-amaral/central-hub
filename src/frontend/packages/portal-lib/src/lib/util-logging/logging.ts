import {Injectable, isDevMode} from "@angular/core";
import {LoggingLevelEnum} from "./logging-enum";

@Injectable()
export class LoggingService {

    //For unit testing purpose
    isDevMode(): boolean {
        return isDevMode();
    }

    log(message: string, ...args: unknown[]): void {
        if (this.isDevMode()) {
            this.#message(LoggingLevelEnum.INFO, message, ...args);
        }
    }

    warn(message: string, ...args: unknown[]): void {
        this.#message(LoggingLevelEnum.WARN, message, ...args);
    }

    error(message: string, ...args: unknown[]): void {
        this.#message(LoggingLevelEnum.ERROR, message, ...args);
    }

    #message(level: LoggingLevelEnum, message: string, ...args: unknown[]): void {
        /* eslint-disable no-console */
        switch (level) {
            case LoggingLevelEnum.INFO:
                console.log(`${message}`, ...args);
                break;
            case LoggingLevelEnum.ERROR:
                console.error(`${message}`, ...args);
                break;
            case LoggingLevelEnum.WARN:
                console.warn(`${message}`, ...args);
                break;
            default:
        }
        /* eslint-enable no-console */
    }
}
