import { of, Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';
import { mockContacts } from '../interfaces/contact.mock';
import { Injectable } from '@angular/core';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceStub extends ContactService {
  public contacts$ = of(mockContacts);
  public url = `http://demo5838836.mockable.io/contact`;

  constructor() {
    super(null);
  }

  fetchContacts(): Observable<Contact[]> {
    return of(mockContacts);
  }

  saveContact(contact: Contact): Observable<Contact> {
    return of(mockContacts[0]);
  }
}
