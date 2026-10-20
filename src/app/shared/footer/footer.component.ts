import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactformComponent } from '../contactform/contactform.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContactformComponent, TranslateModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly document = inject(DOCUMENT);
  readonly currentYear = new Date().getFullYear();

  // Stays on the current page (e.g. the imprint) instead of routing to the home page.
  scrollToTop(event: Event): void {
    event.preventDefault();
    this.document.getElementById('main-content')?.focus({ preventScroll: true });
    this.document.defaultView?.scrollTo({ top: 0 });
  }
}
