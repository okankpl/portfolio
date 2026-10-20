import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('scrolls back to the top of the current page without navigating', () => {
    const main = document.createElement('main');
    main.id = 'main-content';
    main.tabIndex = -1;
    document.body.appendChild(main);
    const scrollTo = spyOn(window, 'scrollTo') as jasmine.Spy;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });

    fixture.nativeElement.querySelector('.legal-notice a[href="#main-content"]').dispatchEvent(event);

    expect(event.defaultPrevented).toBeTrue();
    expect(document.activeElement).toBe(main);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
    main.remove();
  });
});
