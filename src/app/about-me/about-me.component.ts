import { Component } from '@angular/core';
import { NavarrowComponent } from '../shared/navarrow/navarrow.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [NavarrowComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
backgroundColor: any;

}
