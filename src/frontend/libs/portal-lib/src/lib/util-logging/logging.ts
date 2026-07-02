import { Injectable } from '@angular/core';
import { LoggingLevelEnum } from './logging-enum';

type LogHandler = (message: string, ...args: unknown[]) => void;

@Injectable()
export class LoggingService {
  readonly #handlers: Record<LoggingLevelEnum, LogHandler> = {
    /* eslint-disable no-console */
    [LoggingLevelEnum.INFO]: (message, ...args) =>
      console.log(message, ...args),
    [LoggingLevelEnum.ERROR]: (message, ...args) =>
      console.error(message, ...args),
    [LoggingLevelEnum.WARN]: (message, ...args) =>
      console.warn(message, ...args),
    /* eslint-enable no-console */
  };

  log(message: string, ...args: unknown[]): void {
    this.#message(LoggingLevelEnum.INFO, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.#message(LoggingLevelEnum.WARN, message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.#message(LoggingLevelEnum.ERROR, message, ...args);
  }

  #message(level: LoggingLevelEnum, message: string, ...args: unknown[]): void {
    this.#handlers[level](message, ...args);
  }
}
