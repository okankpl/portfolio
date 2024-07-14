import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
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
export class ProjectsComponent implements OnInit, AfterViewInit {
  projects: { id: number; img: string; title: string; languages: string; description: string; projecturl: string; githuburl: string; }[] = [];
  visibleProjects: Set<number> = new Set();
  
  @ViewChildren('projectSection') projectSections!: QueryList<ElementRef>;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.projects = this.portfolioService.projects;
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = parseInt(entry.target.getAttribute('data-index')!, 10);
        if (entry.isIntersecting) {
          this.visibleProjects.add(id);
        } else {
          this.visibleProjects.delete(id);
        }
      });
    }, { threshold: 0.1 });

    this.projectSections.forEach(section => {
      observer.observe(section.nativeElement);
    });
  }

  isVisible(id: number) {
    return this.visibleProjects.has(id);
  }
}