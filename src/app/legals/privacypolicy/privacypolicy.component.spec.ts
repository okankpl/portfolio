import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PrivacypolicyComponent } from './privacypolicy.component';

describe('PrivacypolicyComponent', () => {
  let component: PrivacypolicyComponent;
  let fixture: ComponentFixture<PrivacypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacypolicyComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the German policy or the English translation with the current contact address', () => {
    const translate = TestBed.inject(TranslateService);
    const page = fixture.nativeElement as HTMLElement;

    translate.use('de');
    fixture.detectChanges();
    expect(page.querySelector('h1')?.textContent).toContain('Datenschutz');
    expect(page.textContent).toContain('Okan Kaplan');
    expect(page.textContent).toContain('contact@okan-kaplan.de');

    translate.use('en');
    fixture.detectChanges();
    expect(page.querySelector('h1')?.textContent).toBe('Privacy Policy');
    expect(page.textContent).toContain('contact@okan-kaplan.de');
    expect(page.textContent).not.toContain('Google Fonts');
  });
});
