import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';
import { CustomTranslateService } from './translate.service';

class ControlledTranslateService {
  browserLanguage = 'en';
  currentLang = '';
  private defaultLanguage = '';
  readonly requests: { language: string; response: Subject<object> }[] = [];
  readonly addLangs = jasmine.createSpy('addLangs');
  readonly use = jasmine.createSpy('use').and.callFake((language: string) => {
    this.currentLang = language;
    return of({});
  });
  readonly setDefaultLang = jasmine.createSpy('setDefaultLang').and.callFake((language: string) => {
    this.defaultLanguage = language;
  });

  getBrowserLang(): string { return this.browserLanguage; }
  getDefaultLang(): string { return this.defaultLanguage; }

  getTranslation(language: string): Observable<object> {
    const response = new Subject<object>();
    this.requests.push({ language, response });
    return response.asObservable();
  }

  respond(language: string): void {
    const request = this.requests.find(candidate => candidate.language === language);
    if (!request) throw new Error(`No pending translation request for ${language}`);
    request.response.next({});
    request.response.complete();
  }
}

describe('CustomTranslateService', () => {
  let translate: ControlledTranslateService;
  let storage: jasmine.SpyObj<Pick<Storage, 'getItem' | 'setItem'>>;
  let document: Document;

  beforeEach(() => {
    translate = new ControlledTranslateService();
    storage = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);
    storage.getItem.and.returnValue(null);
    document = {
      documentElement: { lang: '' },
      defaultView: { localStorage: storage }
    } as unknown as Document;
  });

  function createService(): CustomTranslateService {
    return new CustomTranslateService(translate as unknown as TranslateService, document);
  }

  it('restores a supported saved choice ahead of the browser language and sets html lang immediately', () => {
    translate.browserLanguage = 'de';
    storage.getItem.and.returnValue('en');
    const service = createService();
    expect(service.getCurrentLanguage()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(storage.getItem).toHaveBeenCalledWith('portfolio-language');

    translate.respond('en');
    expect(translate.currentLang).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(storage.setItem).toHaveBeenCalledWith('portfolio-language', 'en');
  });

  it('still initializes and switches language when localStorage reads and writes are blocked', () => {
    translate.browserLanguage = 'de';
    storage.getItem.and.throwError('Storage access denied');
    storage.setItem.and.throwError('Storage access denied');
    const service = createService();
    translate.respond('de');
    service.switchLanguage('en');
    translate.respond('en');

    expect(service.getCurrentLanguage()).toBe('en');
    expect(translate.currentLang).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(storage.setItem).toHaveBeenCalledWith('portfolio-language', 'en');
  });

  it('keeps the latest requested language when translation responses finish in reverse order', () => {
    const service = createService();
    service.switchLanguage('de');
    translate.respond('de');
    expect(service.getCurrentLanguage()).toBe('de');

    translate.respond('en');
    expect(service.getCurrentLanguage()).toBe('de');
    expect(translate.currentLang).toBe('de');
    expect(document.documentElement.lang).toBe('de');
    expect(translate.use.calls.allArgs()).toEqual([['de']]);
    expect(storage.setItem.calls.allArgs()).toEqual([['portfolio-language', 'de']]);
  });

  it('falls back from an unsupported saved language and ignores unsupported switch requests', () => {
    storage.getItem.and.returnValue('fr');
    translate.browserLanguage = 'de';
    const service = createService();
    service.switchLanguage('fr');
    expect(document.documentElement.lang).toBe('de');
    expect(translate.requests.map(request => request.language)).toEqual(['de']);
    translate.respond('de');
    expect(service.getCurrentLanguage()).toBe('de');
    expect(translate.currentLang).toBe('de');
  });
});
