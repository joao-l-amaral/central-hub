import {I18nService} from "@portal-library";
import {TestBed} from "@angular/core/testing";
import {expect} from "vitest";

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nService],
    });

    service = TestBed.inject(I18nService);
  });

  it('should initialize with an empty dictionary', () => {
    expect(service.i18n).toEqual(undefined);
  });

  it('new dictionary merges into the empty one', () => {
    const dictionary = new Map<string, string>();
    dictionary.set("teste", "test");

    service.merge(dictionary);

    expect(service.i18n).toEqual(dictionary);
  });

  it('new dictionary merges into a old one', () => {
    const dictionary1 = new Map<string, string>();
    dictionary1.set("teste", "test");

    service.merge(dictionary1);

    const dictionary2 = new Map<string, string>();
    dictionary2.set("aa", "dd");

    service.merge(dictionary2);

    const expectedDictionary = new Map<string, string>([
      ['teste', 'test'],
      ['aa', 'dd'],
    ]);

    expect(service.i18n).toEqual(expectedDictionary);
  });

  it('get key value that is not present in the dictionary', () => {
    const value = service.translate("noValue");
    expect(value).toEqual("noValue");
  });

  it('get value from dictionary', () => {
    const dictionary = new Map<string, string>();
    dictionary.set("teste", "test");

    service.merge(dictionary);

    const value = service.translate("teste");

    expect(value).toEqual("test");
  });

  it('get value from dictionary with argument', () => {
    const dictionary = new Map<string, string>();
    dictionary.set("teste", "test: %s");

    service.merge(dictionary);

    const value = service.translate("teste", "aaa");

    expect(value).toEqual("test: aaa");
  });

});
