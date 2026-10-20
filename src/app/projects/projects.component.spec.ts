import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, TranslateModule.forRoot()]
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();
  });

  it('presents SmartDesk first with its public demo and source in separate tabs', () => {
    const articles = fixture.nativeElement.querySelectorAll('article') as NodeListOf<HTMLElement>;
    expect(articles.length).toBe(3);
    expect(articles[0].getAttribute('aria-labelledby')).toBe('smartdesk-title');
    const smartdesk = articles[0];
    expect(smartdesk.querySelector('.portfolio-img')?.getAttribute('href')).toBe('https://smartdesk-okan.duckdns.org');
    const actions = Array.from(smartdesk.querySelectorAll<HTMLAnchorElement>('.project-actions a'));
    expect(actions.map(action => action.getAttribute('href'))).toEqual([
      'https://smartdesk-okan.duckdns.org',
      'https://github.com/okankpl/SmartDesk'
    ]);
    for (const link of Array.from(smartdesk.querySelectorAll('a'))) {
      expect(link.target).toBe('_blank');
      expect(link.relList.contains('noopener')).toBeTrue();
    }
    expect(smartdesk.querySelector('img')?.getAttribute('alt')).toBe('PROJECTS.SMARTDESK.IMAGE_ALT');
    expect(smartdesk.querySelector('.demo-note')?.textContent).toContain('PROJECTS.SMARTDESK.DEMO_NOTE');
    expect(articles[0].querySelectorAll('.highlights li').length).toBe(3);
    expect(articles[0].querySelector('a[href*="localhost"]')).toBeNull();
    expect(smartdesk.querySelector('a[href$="#demo-starten"]')).toBeNull();
    expect(smartdesk.querySelector('iframe')).toBeNull();
  });

  it('keeps both existing demos and all project descriptions visible without a scroll observer', () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('a[href="https://join.okan-kaplan.de/"]')).not.toBeNull();
    expect(page.querySelector('a[href="https://elpolloloco.okan-kaplan.de/"]')).not.toBeNull();
    expect(page.querySelectorAll('article .desc p').length).toBe(4);
    for (const image of Array.from(page.querySelectorAll<HTMLImageElement>('.portfolio-img img'))) {
      expect(image.loading).toBe('lazy');
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
    }
  });
});
