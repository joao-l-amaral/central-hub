import {TestBed} from "@angular/core/testing";
import {LoggingService} from "./logging";
import {LoggingLevelEnum} from "./logging-enum";

describe('LoggingService', () => {
    let service: LoggingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoggingService],
        });
        service = TestBed.inject(LoggingService);
    });

    it('logs info messages in dev mode', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => {
            // noop
        });
        const devModeSpy = vi.spyOn(service, 'isDevMode').mockReturnValue(true);

        service.log(LoggingLevelEnum.INFO, 'hello', 1, 2);

        expect(spy).toHaveBeenCalledWith('LOG', 'hello', 1, 2);

        devModeSpy.mockRestore();
        spy.mockRestore();
    });

    it('logs info messages in prod mode', () => {
        const spy = vi.spyOn(console, 'log').mockImplementation(() => {
            // noop
        });
        const devModeSpy = vi.spyOn(service, 'isDevMode').mockReturnValue(false);

        service.log(LoggingLevelEnum.INFO, 'hello', 1, 2);

        expect(spy).not.toHaveBeenCalled();

        devModeSpy.mockRestore();
        spy.mockRestore();
    });

    it('logs warn messages', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {
            // noop
        });

        service.warn(LoggingLevelEnum.WARN, 'hello', 1, 2);

        expect(spy).toHaveBeenCalledWith('WARN', 'hello', 1, 2);
        spy.mockRestore();
    });

    it('logs error messages', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {
            // noop
        });

        service.error(LoggingLevelEnum.ERROR, 'hello', 1, 2);

        expect(spy).toHaveBeenCalledWith('ERROR', 'hello', 1, 2);
        spy.mockRestore();
    });

});
