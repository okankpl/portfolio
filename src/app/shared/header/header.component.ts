import { Component, Renderer2, Inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DOCUMENT, CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggleOverlay', [
      state('inactive', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('active', style({
        height: '92vh'
      })),
      transition('inactive <=> active', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class HeaderComponent {
  menuActive: boolean = false;
  currentFrame: number = 1;
  animationInterval: any;
  isAnimating: boolean = false;
  currentLang: string;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private customTranslateService: CustomTranslateService, private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  switchLanguage(lang: string) {
    this.customTranslateService.switchLanguage(lang);
  }

  toggleMenu() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.menuActive = !this.menuActive;

    if (this.menuActive) {
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
      this.renderer.setStyle(this.document.body, 'height', '100%');
    } else {
      this.renderer.removeStyle(this.document.body, 'overflow');
      this.renderer.removeStyle(this.document.body, 'height');
    }
    this.startAnimation(this.menuActive ? 1 : 5, this.menuActive ? 5 : 1, () => {
      this.isAnimating = false;
    });
  }

  startAnimation(start: number, end: number, callback: () => void) {
    let step = start < end ? 1 : -1;
    this.currentFrame = start;
    this.animationInterval = setInterval(() => {
      this.currentFrame += step;
      if (this.currentFrame === end) {
        clearInterval(this.animationInterval);
        callback();
      }
    }, 100);
  }

  getCurrentFrame() {
    return `./assets/img/burgermenu${this.currentFrame}.png`;
  }

  closeMenu() {
    this.toggleMenu();
  }
}