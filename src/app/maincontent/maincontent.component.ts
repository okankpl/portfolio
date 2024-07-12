import { Component } from '@angular/core';
import { StartscreenComponent } from './../startscreen/startscreen.component';
import { FooterComponent } from './../shared/footer/footer.component';
import { HeaderComponent } from './../shared/header/header.component';
import { AboutMeComponent } from './../about-me/about-me.component';
import { MyskillsComponent } from './../myskills/myskills.component';
import { ProjectsComponent } from './../projects/projects.component';

@Component({
  selector: 'app-maincontent',
  standalone: true,
  imports: [HeaderComponent, StartscreenComponent, AboutMeComponent, MyskillsComponent, ProjectsComponent, FooterComponent],
  templateUrl: './maincontent.component.html',
  styleUrl: './maincontent.component.scss'
})
export class MaincontentComponent {

}
