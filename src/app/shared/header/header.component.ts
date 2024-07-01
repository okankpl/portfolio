import { Component } from '@angular/core';
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
  currentFrame: number = 0;
  frames: string[] = [
    './../../../assets/img/burgermenu1.png',
    './../../../assets/img/burgermenu2.png',
    './../../../assets/img/burgermenu3.png',
    './../../../assets/img/burgermenu4.png',
    './../../../assets/img/burgermenu5.png',
  ];

  toggleMenu() {
    if (!this.menuActive) {
      this.playAnimation(true);
    } else {
      this.playAnimation(false);
    }
  }

  playAnimation(opening: boolean) {
    const interval = 100;
    let frameIndex = 0;

    const animation = setInterval(() => {
      this.currentFrame = opening ? frameIndex : this.frames.length - 1 - frameIndex;
      frameIndex++;
      if (frameIndex === this.frames.length) {
        clearInterval(animation);
        this.menuActive = opening;
        if (!opening) {
          this.currentFrame = 0; 
        }
      }
    }, interval);
  }

  getCurrentFrame() {
    return this.frames[this.currentFrame];
  }
}
