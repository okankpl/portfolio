import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navarrow',
  standalone: true,
  templateUrl: './navarrow.component.html',
  styleUrls: ['./navarrow.component.scss']
})
export class NavarrowComponent implements AfterViewInit {
  @ViewChild('arrowSection') arrowSection!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const arrow = this.arrowSection.nativeElement.querySelector('.arrow');
        if (entry.isIntersecting) {
          arrow.classList.add('animate');
          observer.unobserve(this.arrowSection.nativeElement); 
        }
      });
    });

    observer.observe(this.arrowSection.nativeElement);
  }
}