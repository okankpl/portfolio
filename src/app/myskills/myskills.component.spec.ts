import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { MyskillsComponent } from './myskills.component';

describe('MyskillsComponent', () => {
  let component: MyskillsComponent;
  let fixture: ComponentFixture<MyskillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyskillsComponent, TranslateModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lists the testing tools next to the SmartDesk stack', () => {
    const chips = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.backend-skills li'), li => li.textContent?.trim());
    expect(chips).toContain('FastAPI');
    expect(chips).toContain('Pytest');
    expect(chips).toContain('Playwright');
  });
});
