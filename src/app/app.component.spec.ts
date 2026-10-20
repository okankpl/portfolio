import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomTranslateService } from './services/translate.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('renders one shared header and footer with a skip link to the main content', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('header').length).toBe(1);
    expect(page.querySelectorAll('footer').length).toBe(1);
    expect(page.querySelector('main')?.id).toBe('main-content');
    expect(page.querySelector('.skip-link')?.getAttribute('href')).toBe('#main-content');
    fixture.destroy();
  });

  it('focuses the current main content without following the base URL', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    fixture.nativeElement.querySelector('.skip-link').dispatchEvent(event);
    expect(event.defaultPrevented).toBeTrue();
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('main'));
    fixture.destroy();
  });

  it('switches page and social metadata with the language and stops updating after destruction', () => {
    TestBed.overrideProvider(CustomTranslateService, { useValue: {
      getCurrentLanguage: () => 'de'
    } });
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('de', { META: {
      TITLE: 'Okan Kaplan | Webentwickler', DESCRIPTION: 'Deutsche Beschreibung', OG_DESCRIPTION: 'Deutsche Vorschau'
    } });
    translate.setTranslation('en', { META: {
      TITLE: 'Okan Kaplan | Web Developer', DESCRIPTION: 'English description', OG_DESCRIPTION: 'English preview'
    } });
    const setTitle = spyOn(TestBed.inject(Title), 'setTitle');
    const updateTag = spyOn(TestBed.inject(Meta), 'updateTag');
    translate.use('de');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(setTitle).toHaveBeenCalledWith('Okan Kaplan | Webentwickler');
    expect(updateTag).toHaveBeenCalledWith({ name: 'description', content: 'Deutsche Beschreibung' });

    translate.use('en');
    expect(setTitle).toHaveBeenCalledWith('Okan Kaplan | Web Developer');
    expect(updateTag).toHaveBeenCalledWith({ name: 'description', content: 'English description' });
    expect(updateTag).toHaveBeenCalledWith({ property: 'og:title', content: 'Okan Kaplan | Web Developer' });
    expect(updateTag).toHaveBeenCalledWith({ property: 'og:description', content: 'English preview' });

    fixture.destroy();
    setTitle.calls.reset();
    updateTag.calls.reset();
    translate.use('de');
    expect(setTitle).not.toHaveBeenCalled();
    expect(updateTag).not.toHaveBeenCalled();
  });
});
