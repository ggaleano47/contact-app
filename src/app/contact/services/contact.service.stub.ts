import { of, BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';
import { mockContacts } from '../interfaces/contact.mock';

export class ContactServiceStub {
  public contacts$ = of(mockContacts);

  public url = `http://demo5838836.mockable.io/contact`;

  fetchContacts(): Observable<Contact[]> {
    return of(mockContacts);
  }

  saveContact(contact: Contact): Observable<Contact> {
    return of(mockContacts[0]);
  }
}
