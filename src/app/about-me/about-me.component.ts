import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NavarrowComponent } from '../shared/navarrow/navarrow.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule,NavarrowComponent],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent { }