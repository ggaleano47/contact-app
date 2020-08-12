import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  NgForm,
  FormGroupDirective
} from '@angular/forms';
import { Contact } from '../../interfaces/contact';
import { REGEX_EMAIL } from '../../../shared/utils/util';
import { UIService } from '../../../shared/ui.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { PhoneNumber } from 'libphonenumber-js';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit {
  @Output()
  saveContact = new EventEmitter<Contact>();

  @ViewChild(FormGroupDirective, { static: true })
  private formDirective: NgForm;

  @ViewChild(NgxMatIntlTelInputComponent, { static: true })
  phoneComponent: NgxMatIntlTelInputComponent;

  failMsg = 'All required fields must be filled out and valid';

  constructor(private fb: FormBuilder, private uiService: UIService) {}

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(REGEX_EMAIL)]],
    phone: ['', [Validators.required]],
    address: ['', Validators.required]
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact: Contact = {
        ...this.contactForm.value,
        phone: this.getPhone(this.phoneComponent.numberInstance)
      };
      this.saveContact.emit(contact);
    } else {
      this.uiService.showSnackbar(this.failMsg);
    }
  }

  getPhone(numberInstance: PhoneNumber): string {
    const phoneNumber = numberInstance.formatNational();
    const countryCode = numberInstance.countryCallingCode;
    return ['+', countryCode, ' ', phoneNumber].join('');
  }

  backToList(): void {
    this.saveContact.emit();
  }

  clearFields(): void {
    this.formDirective.resetForm();
    this.phoneComponent.reset();
  }
}
