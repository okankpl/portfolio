import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable, from, map, take } from 'rxjs';

type Language = 'de' | 'en';
const LANGUAGE_KEY = 'portfolio-language';

// The texts are bundled as hashed chunks, so a browser never combines new code with a cached old language file.
export class BundledTranslateLoader implements TranslateLoader {
  getTranslation(language: string): Observable<object> {
    const texts = language === 'de' ? import('../../assets/i18n/de.json') : import('../../assets/i18n/en.json');
    return from(texts).pipe(map(module => module.default));
  }
}

@Injectable({ providedIn: 'root' })
export class CustomTranslateService {
  private language: Language;
  private requestedLanguage = 0;
  private readonly loadedLanguages = new Set<Language>();

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    let saved: string | null = null;
    try {
      saved = this.document.defaultView?.localStorage.getItem(LANGUAGE_KEY) ?? null;
    } catch { /* Language selection also works when browser storage is disabled. */ }
    this.language = saved === 'de' || saved === 'en' ? saved :
      this.translate.getBrowserLang()?.toLowerCase() === 'de' ? 'de' : 'en';
    this.document.documentElement.lang = this.language;
    this.translate.addLangs(['de', 'en']);
    this.switchLanguage(this.language, false);
  }

  // Only an explicit choice is stored in localStorage (as described in the privacy policy).
  switchLanguage(language: string, remember = true): void {
    if (language !== 'de' && language !== 'en') return;
    const request = ++this.requestedLanguage;
    if (this.loadedLanguages.has(language)) {
      this.activateLanguage(language, remember);
      return;
    }
    // ngx-translate v15 can activate an older use() request after a newer one.
    // Load first, then use only the last requested language from the cache.
    this.translate.getTranslation(language).pipe(take(1)).subscribe({
      next: () => {
        this.loadedLanguages.add(language);
        if (request === this.requestedLanguage) this.activateLanguage(language, remember);
      },
      error: () => { this.document.documentElement.lang = this.language; }
    });
  }

  getCurrentLanguage(): string {
    return this.language;
  }

  private activateLanguage(language: Language, remember: boolean): void {
    if (!this.translate.getDefaultLang()) this.translate.setDefaultLang(language);
    this.translate.use(language);
    this.language = language;
    this.document.documentElement.lang = language;
    if (!remember) return;
    try {
      this.document.defaultView?.localStorage.setItem(LANGUAGE_KEY, language);
    } catch { /* Keep the in-memory selection when persistence is unavailable. */ }
  }
}
