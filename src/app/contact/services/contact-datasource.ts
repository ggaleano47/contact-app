import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Contact } from '../interfaces/contact';
import { ContactService } from './contact.service';

export class ContactDataSource implements DataSource<Contact> {
  private subContacts$: Subscription = new Subscription();

  constructor(private contactService: ContactService) {}

  connect(collectionViewer: CollectionViewer): Observable<Contact[]> {
    return this.contactService.contacts$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subContacts$.unsubscribe();
  }

  loadContacts(): void {
    this.subContacts$ = this.contactService.contacts$.subscribe();
  }
}
