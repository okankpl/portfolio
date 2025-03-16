import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartscreenComponent } from './../startscreen/startscreen.component';
import { FooterComponent } from './../shared/footer/footer.component';
import { HeaderComponent } from './../shared/header/header.component';
import { AboutMeComponent } from './../about-me/about-me.component';
import { MyskillsComponent } from './../myskills/myskills.component';
import { ProjectsComponent } from './../projects/projects.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-maincontent',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent, StartscreenComponent, AboutMeComponent, MyskillsComponent, ProjectsComponent, FooterComponent],
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.scss']
})
export class MaincontentComponent {}