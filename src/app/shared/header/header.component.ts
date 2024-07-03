import { Component, Renderer2, ElementRef } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuActive: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleMenu() {
    const overlay = this.el.nativeElement.querySelector('.overlay');
    this.menuActive = !this.menuActive;
    if (this.menuActive) {
      this.renderer.addClass(overlay, 'active');
    } else {
      this.renderer.removeClass(overlay, 'active');
    }
  }

  getCurrentFrame() {
    return this.menuActive ? './../../assets/img/burgermenu5.png' : './../../assets/img/burgermenu1.png';
  }
}