import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../portfolio.service'

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
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