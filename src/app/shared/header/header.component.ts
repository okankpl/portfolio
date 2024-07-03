import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggleOverlay', [
      state('inactive', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('active', style({
        height: '92vh'
      })),
      transition('inactive <=> active', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class HeaderComponent {
  menuActive: boolean = false;
  currentFrame: number = 1;
  animationInterval: any;
  isAnimating: boolean = false; // Neue Variable, um den Animationszustand zu speichern

  toggleMenu() {
    if (this.isAnimating) return; // Blockiere, wenn eine Animation läuft

    this.isAnimating = true; // Setze den Animationszustand auf aktiv

    if (!this.menuActive) {
      this.startAnimation(1, 5, () => {
        this.menuActive = true;
        this.isAnimating = false; // Setze den Animationszustand auf beendet
      });
    } else {
      this.startAnimation(5, 1, () => {
        this.menuActive = false;
        this.isAnimating = false; // Setze den Animationszustand auf beendet
      });
    }
  }

  startAnimation(start: number, end: number, callback: () => void) {
    let step = start < end ? 1 : -1;
    this.currentFrame = start;
    this.animationInterval = setInterval(() => {
      this.currentFrame += step;
      if (this.currentFrame === end) {
        clearInterval(this.animationInterval);
        callback();
      }
    }, 100); 
  }

  getCurrentFrame() {
    return `./../../assets/img/burgermenu${this.currentFrame}.png`;
  }
}