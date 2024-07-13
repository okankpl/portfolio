import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { NavArrowMirroredComponent } from '../shared/nav-arrow-mirrored/nav-arrow-mirrored.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';  // Importiere CommonModule
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NavArrowMirroredComponent, TranslateModule,CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: { id: number; img: string; title: string; languages: string; description: string; projecturl: string; githuburl: string; }[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.projects = this.portfolioService.projects;
  }
}