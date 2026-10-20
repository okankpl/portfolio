import { Component, ElementRef, HostListener, Inject, OnDestroy, ViewChild } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CustomTranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('header') private header?: ElementRef<HTMLElement>;
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('firstMenuLink') set firstMenuLink(link: ElementRef<HTMLAnchorElement> | undefined) {
    if (this.menuActive) link?.nativeElement.focus();
  }

  menuActive = false;
  currentLang: string;
  private previousOverflow = '';
  private readonly languageChanges: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private customTranslateService: CustomTranslateService,
    translate: TranslateService
  ) {
    this.currentLang = this.customTranslateService.getCurrentLanguage();
    this.languageChanges = translate.onLangChange.subscribe(({ lang }) => this.currentLang = lang);
  }

  switchLanguage(lang: string): void {
    this.customTranslateService.switchLanguage(lang);
  }

  toggleMenu(): void {
    if (this.menuActive) {
      this.closeMenu();
      return;
    }
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.menuActive = true;
  }

  closeMenu(restoreFocus = true): void {
    if (!this.menuActive) return;
    this.menuActive = false;
    this.document.body.style.overflow = this.previousOverflow;
    if (restoreFocus) this.menuButton?.nativeElement.focus();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.menuActive) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu();
    } else if (event.key === 'Tab') {
      const controls = Array.from(this.header!.nativeElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        .filter(control => control.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = this.document.activeElement;
      if (first && ((!event.shiftKey && active === last) || !controls.includes(active as HTMLElement))) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this.closeMenu(false);
    this.languageChanges.unsubscribe();
  }
}
