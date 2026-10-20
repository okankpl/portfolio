import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    // Router anchor scrolling ignores CSS scroll-margin; keep headings clear of the fixed header (see styles.scss).
    inject(ViewportScroller).setOffset(() => [0, Math.max((this.document.defaultView?.innerHeight ?? 0) * 0.12, 96)]);
    this.translate.stream('META').pipe(takeUntilDestroyed()).subscribe(metadata => {
      if (typeof metadata !== 'object' || !metadata.TITLE) return;
      this.title.setTitle(metadata.TITLE);
      this.meta.updateTag({ name: 'description', content: metadata.DESCRIPTION });
      this.meta.updateTag({ property: 'og:title', content: metadata.TITLE });
      this.meta.updateTag({ property: 'og:description', content: metadata.OG_DESCRIPTION });
    });
  }

  skipToContent(event: Event): void {
    event.preventDefault();
    const main = this.document.getElementById('main-content');
    main?.focus({ preventScroll: true });
    main?.scrollIntoView({ block: 'start' });
  }
}
