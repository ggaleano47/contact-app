import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../../interfaces/contact';
import {
  MASK_PHONE,
  REGEX_EMAIL,
  REGEX_PHONE
} from '../../../shared/utils/util';
import { UIService } from '../../../shared/ui.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit {
  @Output()
  saveContact = new EventEmitter<Contact>();

  mask = MASK_PHONE;
  failMsg = 'All required fields must be filled out and valid';

  constructor(private fb: FormBuilder, private uiService: UIService) {}

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(REGEX_EMAIL)]],
    phone: ['', [Validators.required, Validators.pattern(REGEX_PHONE)]],
    address: ['', Validators.required]
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact: Contact = {
        ...this.contactForm.value
      };
      this.saveContact.emit(contact);
    } else {
      this.uiService.showSnackbar(this.failMsg);
    }
  }

  backToList(): void {
    this.saveContact.emit();
  }

  clearFields(): void {
    this.contactForm.reset();
  }
}
