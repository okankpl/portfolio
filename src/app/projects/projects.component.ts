import { Component, inject } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { NavArrowMirroredComponent } from '../shared/nav-arrow-mirrored/nav-arrow-mirrored.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NavArrowMirroredComponent, TranslateModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  readonly projects = inject(PortfolioService).projects;
}
