import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavArrowMirroredComponent } from './nav-arrow-mirrored.component';

describe('NavArrowMirroredComponent', () => {
  let component: NavArrowMirroredComponent;
  let fixture: ComponentFixture<NavArrowMirroredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavArrowMirroredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavArrowMirroredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
