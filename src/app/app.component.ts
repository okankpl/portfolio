import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MyskillsComponent } from './myskills/myskills.component';
import { ProjectsComponent } from './projects/projects.component';
import { MaincontentComponent } from "./maincontent/maincontent.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule,
    StartscreenComponent, FooterComponent,
    HeaderComponent, AboutMeComponent,
    MyskillsComponent, ProjectsComponent, MaincontentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}