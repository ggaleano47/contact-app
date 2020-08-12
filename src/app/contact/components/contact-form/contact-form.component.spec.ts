import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';

import { ContactFormComponent } from './contact-form.component';
import { UIService } from '../../../shared/ui.service';
import { UIServiceStub } from '../../../shared/ui.service.stub';
import { mockContacts } from '../../interfaces/contact.mock';
import { Contact } from '../../interfaces/contact';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let loader: HarnessLoader;
  let contactFormValues: Contact;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        NgxMatIntlTelInputModule
      ],
      providers: [{ provide: UIService, useClass: UIServiceStub }]
    }).compileComponents();
  }));

  beforeAll(() => {
    contactFormValues = { ...mockContacts[0] };
    delete contactFormValues._id;
    contactFormValues.phone = '+18572234513';
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should validate first name field', () => {
    const firstName = component.contactForm.controls.firstName;
    expect(firstName.valid).toBeFalsy();

    firstName.setValue('');
    expect(firstName.hasError('required')).toBeTruthy();

    firstName.setValue('AAAA');
    expect(firstName.valid).toBeTruthy();
  });

  it('should validate last name field', () => {
    const lastName = component.contactForm.controls.lastName;
    expect(lastName.valid).toBeFalsy();

    lastName.setValue('');
    expect(lastName.hasError('required')).toBeTruthy();

    lastName.setValue('AAAA');
    expect(lastName.valid).toBeTruthy();
  });

  it('should validate company field', () => {
    const company = component.contactForm.controls.company;
    expect(company.valid).toBeFalsy();

    company.setValue('');
    expect(company.hasError('required')).toBeTruthy();

    company.setValue('AAAA');
    expect(company.valid).toBeTruthy();
  });

  it('should validate email field', () => {
    const email = component.contactForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('AAAA');
    expect(email.hasError('pattern')).toBeTruthy();

    email.setValue('aa@gmail');
    expect(email.hasError('pattern')).toBeTruthy();

    email.setValue('aa@gmail.com');
    expect(email.valid).toBeTruthy();
  });

  it('should validate phone field', () => {
    const phone = component.contactForm.controls.phone;
    expect(phone.valid).toBeFalsy();

    phone.setValue('');
    expect(phone.hasError('required')).toBeTruthy();

    phone.setValue('+18572234513');
    expect(phone.valid).toBeTruthy();
  });

  it('should validate address field', () => {
    const address = component.contactForm.controls.address;
    expect(address.valid).toBeFalsy();

    address.setValue('');
    expect(address.hasError('required')).toBeTruthy();

    address.setValue('123');
    expect(address.valid).toBeTruthy();
  });

  it('should emit the saved contact when the form is valid', async () => {
    const uiService = 'uiService';
    spyOn(component[uiService], 'showSnackbar');
    spyOn(component.saveContact, 'emit');
    component.contactForm.setValue(contactFormValues);
    const buttonHarness = await loader.getHarness<MatButtonHarness>(
      MatButtonHarness.with({ text: 'Submit' })
    );
    await buttonHarness.click();
    expect(component.contactForm.valid).toBeTruthy();
    expect(component.saveContact.emit).toHaveBeenCalled();
    expect(component[uiService].showSnackbar).not.toHaveBeenCalledWith(
      component.failMsg
    );
  });

  it('should show the snackbar with and error when the form is invalid', async () => {
    const uiService = 'uiService';
    spyOn(component[uiService], 'showSnackbar');
    spyOn(component.saveContact, 'emit');
    const buttonHarness = await loader.getHarness<MatButtonHarness>(
      MatButtonHarness.with({ text: 'Submit' })
    );
    await buttonHarness.click();
    expect(component.contactForm.valid).toBeFalsy();
    expect(component[uiService].showSnackbar).toHaveBeenCalledWith(
      component.failMsg
    );
    expect(component.saveContact.emit).not.toHaveBeenCalled();
  });

  it('should clear all the inputs of the form', async () => {
    component.contactForm.setValue(contactFormValues);
    expect(component.contactForm.valid).toBeTruthy();
    const buttonHarness = await loader.getHarness<MatButtonHarness>(
      MatButtonHarness.with({ text: 'Clear' })
    );
    await buttonHarness.click();
    expect(component.contactForm.valid).toBeFalsy();
  });
});
