import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslateService } from '../../services/translate.service';

// The legal text (eRecht24) lives in the template; German is the binding version.
@Component({
  selector: 'app-privacypolicy',
  standalone: true,
  templateUrl: './privacypolicy.component.html',
  styleUrl: './privacypolicy.component.scss'
})
export class PrivacypolicyComponent {
  currentLang: string;

  constructor(customTranslateService: CustomTranslateService, translate: TranslateService) {
    this.currentLang = customTranslateService.getCurrentLanguage();
    translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(({ lang }) => this.currentLang = lang);
  }
}
