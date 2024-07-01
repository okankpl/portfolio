import { Component } from '@angular/core';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  animationTimeout: any;
  animationInterval: any;

  startAnimation() {
    const scrollImgElement = document.getElementById('scroll-img') as HTMLImageElement;
    if (scrollImgElement) {
      let frame = 1;
      this.animationInterval = setInterval(() => {
        frame = frame < 4 ? frame + 1 : 1;
        scrollImgElement.src = `./../../assets/img/scrolldown${frame}.png`;
      }, 250); 
    }
  }

  stopAnimation() {
    clearInterval(this.animationInterval);
    const scrollImgElement = document.getElementById('scroll-img') as HTMLImageElement;
    if (scrollImgElement) {
      this.animationTimeout = setTimeout(() => {
        scrollImgElement.src = './../../assets/img/scrolldown1.png';
      }, 500); 
    }
  }
}