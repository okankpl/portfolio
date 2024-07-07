import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavarrowComponent } from './navarrow.component';

describe('NavarrowComponent', () => {
  let component: NavarrowComponent;
  let fixture: ComponentFixture<NavarrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavarrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavarrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
