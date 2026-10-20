import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomTranslateService } from '../../services/translate.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let previousOverflow: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: CustomTranslateService, useValue: {
          getCurrentLanguage: () => 'de',
          switchLanguage: jasmine.createSpy('switchLanguage')
        } }
      ]
    })
    .compileComponents();
    previousOverflow = document.body.style.overflow;
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('de', { HEADER: { OPEN_MENU: 'Menü öffnen', CLOSE_MENU: 'Menü schließen', SWITCH_EN: 'Auf Englisch wechseln' } });
    translate.setTranslation('en', { HEADER: { OPEN_MENU: 'Open menu', CLOSE_MENU: 'Close menu', SWITCH_DE: 'Switch to German' } });
    translate.use('de');
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    document.body.style.overflow = previousOverflow;
  });

  it('opens with focus on the first link and closes with Escape, restoring focus and scrolling', () => {
    document.body.style.overflow = 'auto';
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.burger-menu');
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.nav-links a'));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(component.menuActive).toBeFalse();
    expect(document.activeElement).toBe(button);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('keeps Tab and Shift+Tab inside the open navigation and header controls', () => {
    component.toggleMenu();
    fixture.detectChanges();
    const first: HTMLAnchorElement = fixture.nativeElement.querySelector('header > a');
    const last: HTMLAnchorElement = fixture.nativeElement.querySelector('.links a:last-child');
    last.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', cancelable: true, bubbles: true }));
    expect(document.activeElement).toBe(first);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true, bubbles: true }));
    expect(document.activeElement).toBe(last);
  });

  it('restores scrolling if the header is destroyed while the menu is open', () => {
    document.body.style.overflow = 'scroll';
    component.toggleMenu();
    fixture.destroy();
    expect(document.body.style.overflow).toBe('scroll');
  });

  it('uses links to home sections and a native button for the language switch', () => {
    const languageButton: HTMLButtonElement = fixture.nativeElement.querySelector('.translate');
    expect(languageButton.getAttribute('aria-label')).toBe('Auf Englisch wechseln');
    languageButton.click();
    expect(TestBed.inject(CustomTranslateService).switchLanguage).toHaveBeenCalledWith('en');
    component.toggleMenu();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.nav-links a').getAttribute('href')).toBe('/#aboutMe');
  });

  it('updates menu and language switch labels when the language changes', () => {
    component.toggleMenu();
    TestBed.inject(TranslateService).use('en');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.translate').getAttribute('aria-label')).toBe('Switch to German');
    expect(fixture.nativeElement.querySelector('.burger-menu').getAttribute('aria-label')).toBe('Close menu');
  });
});
