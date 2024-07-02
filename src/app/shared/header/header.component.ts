import { Component, Renderer2, ElementRef } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuActive: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleMenu() {
    const overlay = this.el.nativeElement.querySelector('.overlay');
    if (this.menuActive) {
      this.renderer.removeClass(overlay, 'active');
      this.renderer.addClass(overlay, 'inactive');
    } else {
      this.renderer.removeClass(overlay, 'inactive');
      this.renderer.addClass(overlay, 'active');
    }
    this.menuActive = !this.menuActive;
  }


  getCurrentFrame() {
    return this.menuActive ? 'path/to/close-icon.png' : 'path/to/burger-icon.png';
  }
}
