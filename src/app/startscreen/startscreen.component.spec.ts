import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { StartscreenComponent } from './startscreen.component';

describe('StartscreenComponent', () => {
  let component: StartscreenComponent;
  let fixture: ComponentFixture<StartscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartscreenComponent, TranslateModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
