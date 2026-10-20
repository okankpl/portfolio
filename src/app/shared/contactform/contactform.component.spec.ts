import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { ContactformComponent } from './contactform.component';

describe('ContactformComponent', () => {
  let component: ContactformComponent;
  let fixture: ComponentFixture<ContactformComponent>;
  let http: HttpTestingController;
  let form: NgForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactformComponent, HttpClientTestingModule, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactformComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await fixture.whenStable();
    form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
  });

  afterEach(() => http.verify());

  async function fillForm(): Promise<void> {
    component.contactData = {
      name: ' Okan ',
      email: 'okan@example.com',
      message: ' Eine Nachricht. ',
      privacyPolicy: true
    };
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('sends one JSON request while pending and resets only after confirmed success', async () => {
    await fillForm();
    component.onSubmit(form);
    component.onSubmit(form);

    const request = http.expectOne('/sendMail.php');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      name: 'Okan',
      email: 'okan@example.com',
      message: 'Eine Nachricht.',
      privacyPolicy: true
    });
    expect(component.isSending).toBeTrue();
    expect(component.contactData.message).toBe(' Eine Nachricht. ');

    request.flush({ success: true });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isSending).toBeFalse();
    expect(component.feedbackMessage).toBe('CONTACT_FORM.EMAIL_SENT');
    expect(component.contactData).toEqual({ name: '', email: '', message: '', privacyPolicy: false });
    expect(form.submitted).toBeFalse();
  });

  it('keeps the draft and exposes a retry after a transport error', async () => {
    await fillForm();
    const draft = { ...component.contactData };
    component.onSubmit(form);
    http.expectOne('/sendMail.php').flush(
      { success: false, error: 'mail_unavailable' },
      { status: 503, statusText: 'Service Unavailable' }
    );
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isSending).toBeFalse();
    expect(component.sendFailed).toBeTrue();
    expect(component.contactData).toEqual(draft);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('CONTACT_FORM.SEND_ERROR');

    component.onSubmit(form);
    expect(component.isSending).toBeTrue();
    http.expectOne('/sendMail.php').flush({ success: true });
    expect(component.sendFailed).toBeFalse();
  });

  it('does not clear the draft for an unconfirmed success response', async () => {
    await fillForm();
    const draft = { ...component.contactData };
    component.onSubmit(form);
    http.expectOne('/sendMail.php').flush({ success: false });

    expect(component.isSending).toBeFalse();
    expect(component.sendFailed).toBeTrue();
    expect(component.contactData).toEqual(draft);
  });

  it('does not send an invalid form or a whitespace-only message', async () => {
    component.onSubmit(form);
    http.expectNone('/sendMail.php');

    await fillForm();
    component.contactData.message = '   ';
    fixture.detectChanges();
    await fixture.whenStable();
    component.onSubmit(form);

    expect(form.valid).toBeFalse();
    expect(component.isSending).toBeFalse();
    http.expectNone('/sendMail.php');
  });
});