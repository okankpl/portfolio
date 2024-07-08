import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../portfolio.service'
import { NavArrowMirroredComponent } from '../shared/nav-arrow-mirrored/nav-arrow-mirrored.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NavArrowMirroredComponent],
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