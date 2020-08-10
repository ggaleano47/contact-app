import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Contact } from '../interfaces/contact';
import { ContactService } from './contact.service';

export class ContactDataSource implements DataSource<Contact> {
  private subscription$: Subscription;

  constructor(private contactService: ContactService) {}

  connect(collectionViewer: CollectionViewer): Observable<Contact[]> {
    return this.contactService.contacts$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  loadContacts(): void {
    this.subscription$ = this.contactService.contacts$
      .pipe(catchError(() => of([])))
      .subscribe();
  }
}
