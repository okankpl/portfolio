import { Component, inject } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [TranslateModule],
  selector: 'app-myskills',
  standalone: true,
  templateUrl: './myskills.component.html',
  styleUrls: ['./myskills.component.scss']
})
export class MyskillsComponent {
  private readonly portfolio = inject(PortfolioService);
  readonly skills = this.portfolio.skills;
  readonly backendSkills = this.portfolio.backendSkills;
  readonly testingSkills = this.portfolio.testingSkills;
}
