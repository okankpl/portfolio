import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './../portfolio.service';

@Component({
  selector: 'app-myskills',
  standalone: true,
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.scss']
})
export class MyskillsComponent implements OnInit {
  skills: { icon: string; name: string; }[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.skills = this.portfolioService.skills;
  }
  }
