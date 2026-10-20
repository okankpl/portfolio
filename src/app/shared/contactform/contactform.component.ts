import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';

interface ContactData {
  name: string;
  email: string;
  message: string;
  privacyPolicy: boolean;
}

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [FormsModule, TranslateModule, CommonModule],
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.scss']
})
export class ContactformComponent {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  readonly nonWhitespacePattern = /\S/;
  contactData: ContactData = this.emptyContactData();
  isSending = false;
  feedbackMessage = '';
  sendFailed = false;

  onSubmit(form: NgForm): void {
    if (this.isSending) return;

    form.form.markAllAsTouched();
    if (!form.valid || !this.contactData.privacyPolicy) return;

    const payload: ContactData = {
      ...this.contactData,
      name: this.contactData.name.trim(),
      email: this.contactData.email.trim(),
      message: this.contactData.message.trim()
    };
    if (!payload.name || !payload.message) return;

    this.isSending = true;
    this.sendFailed = false;
    this.feedbackMessage = '';

    this.http.post<{ success: boolean }>('/sendMail.php', payload).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isSending = false)
    ).subscribe({
      next: response => {
        if (response?.success !== true) {
          this.showSendError();
          return;
        }

        this.contactData = this.emptyContactData();
        form.resetForm(this.contactData);
        this.feedbackMessage = 'CONTACT_FORM.EMAIL_SENT';
      },
      error: () => this.showSendError()
    });
  }

  private showSendError(): void {
    this.sendFailed = true;
    this.feedbackMessage = 'CONTACT_FORM.SEND_ERROR';
  }

  private emptyContactData(): ContactData {
    return { name: '', email: '', message: '', privacyPolicy: false };
  }
}
