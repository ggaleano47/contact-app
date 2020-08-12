import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ContactDataSource } from './services/contact-datasource';
import { ContactService } from './services/contact.service';
import { Contact } from './interfaces/contact';
import { UIService } from '../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy {
  contactDataSource: ContactDataSource;
  showList = true;
  private successMsg = 'Contact added successfully!';
  private failMsg = 'Error adding the contact!';
  private contactsSub$: Subscription = new Subscription();

  constructor(
    private contactService: ContactService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.contactDataSource = new ContactDataSource(this.contactService);
    this.contactService.fetchContacts().subscribe();
  }

  createContact(contact: Contact): void {
    if (contact) {
      this.contactsSub$ = this.contactService.saveContact(contact).subscribe(
        newContact => {
          console.log(JSON.stringify(newContact));
          this.showList = true;
          this.uiService.showSnackbar(this.successMsg);
        },
        () => {
          this.uiService.showSnackbar(this.failMsg);
        }
      );
    } else {
      this.showList = true;
    }
  }

  showForm(): void {
    this.showList = false;
  }

  ngOnDestroy(): void {
    this.contactsSub$.unsubscribe();
  }
}
