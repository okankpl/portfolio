import { Component } from '@angular/core';
import { StartscreenComponent } from '../startscreen/startscreen.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { MyskillsComponent } from '../myskills/myskills.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-maincontent',
  standalone: true,
  imports: [StartscreenComponent, AboutMeComponent, MyskillsComponent, ProjectsComponent],
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.scss']
})
export class MaincontentComponent {}
