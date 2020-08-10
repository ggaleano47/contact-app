import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { Contact } from '../interfaces/contact';
import { mockContacts } from '../interfaces/contact.mock';
import { ContactDataSource } from './contact-datasource';

export class ContactDataSourceStub extends ContactDataSource {
  connect(collectionViewer: CollectionViewer): Observable<Contact[]> {
    return of(mockContacts);
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  loadContacts(): void {}
}
