import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div *ngIf="show" class="notification" [ngClass]="{ 'show': show }">
      {{ message | translate }}
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() message: string = '';
  @Input() duration: number = 3000;
  show: boolean = false;

  ngOnInit(): void {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, this.duration);
  }
}
