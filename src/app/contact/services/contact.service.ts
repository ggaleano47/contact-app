import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../interfaces/contact';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactsSubject.asObservable();
  url = `http://demo5838836.mockable.io/contact`;

  constructor(private http: HttpClient) {}

  fetchContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url).pipe(
      tap(contacts => {
        this.mergeContacts(contacts);
      })
    );
  }

  saveContact(contact: Contact): Observable<Contact> {
    const newContact = this.createContactWithId(contact);
    return of(newContact).pipe(
      tap(() => {
        this.mergeContacts([newContact]);
      })
    );
  }

  private mergeContacts(contacts: Contact[]): void {
    this.contactsSubject.next(this.contactsSubject.getValue().concat(contacts));
  }

  private createContactWithId(contact: Contact): Contact {
    return {
      ...contact,
      _id: uuid.v4()
    };
  }
}
