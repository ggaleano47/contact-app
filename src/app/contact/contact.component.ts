import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContactDataSource } from './services/contact-datasource';
import { ContactService } from './services/contact.service';
import { Contact } from './interfaces/contact';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  public contactDataSource: ContactDataSource;
  public showList = true;
  private successMsg = 'Contact added successfully!';
  private failMsg = 'Error adding the contact!';

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
      this.contactService.saveContact(contact).subscribe(
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
}
