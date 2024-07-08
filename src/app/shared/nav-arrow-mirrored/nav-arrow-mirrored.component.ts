import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-nav-arrow-mirrored',
  standalone: true,
  imports: [],
  templateUrl: './nav-arrow-mirrored.component.html',
  styleUrl: './nav-arrow-mirrored.component.scss'
})
export class NavArrowMirroredComponent implements AfterViewInit {
  @ViewChild('arrowSection') arrowSection!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const arrow = this.arrowSection.nativeElement.querySelector('.arrow');
        if (entry.isIntersecting) {
          arrow.classList.add('animate');
          observer.unobserve(this.arrowSection.nativeElement); // Stop observing after animation starts
        }
      });
    });

    observer.observe(this.arrowSection.nativeElement);
  }
}