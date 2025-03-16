import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { NavArrowMirroredComponent } from '../shared/nav-arrow-mirrored/nav-arrow-mirrored.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  imports: [NavArrowMirroredComponent, TranslateModule],
  selector: 'app-myskills',
  standalone: true,
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.scss']
})
export class MyskillsComponent implements OnInit {
  skills: { icon: string; name: string; }[] = [];
width: any;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.skills = this.portfolioService.skills;
  }
  }
