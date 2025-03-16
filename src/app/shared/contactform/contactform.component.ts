import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationComponent } from '../../notification/notification.component';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [FormsModule, TranslateModule, CommonModule, NotificationComponent],
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.scss']
})
export class ContactformComponent {
  http = inject(HttpClient);
  contactData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false
  };
  showNotification: boolean = false;
  notificationMessage: string = '';

  post = {
    endPoint: 'https://okan-kaplan.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text'
      }
    }
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && this.contactData.privacyPolicy) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData)).subscribe({
        next: response => {
          this.showNotification = true;
          this.notificationMessage = 'CONTACT_FORM.EMAIL_SENT';
          setTimeout(() => {
            this.showNotification = false;
          }, 3000);
          ngForm.resetForm();
        },
        error: error => {
          console.error(error);
        },
      });
    }
  }
}