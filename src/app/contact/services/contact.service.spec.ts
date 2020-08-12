import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact.service';
import { Contact } from '../interfaces/contact';
import { mockContacts } from '../interfaces/contact.mock';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be able to retreive contacts from the API via GET', () => {
    service.fetchContacts().subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(mockContacts);
    });
    const request = httpMock.expectOne(`${service.url}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockContacts);
    httpMock.verify();
  });

  it('should save the contact and return a new one with an id', async () => {
    const dataKey = 'contactsSubject';
    const mockContact: Contact = {
      ...mockContacts[0],
      _id: undefined
    };
    expect(service[dataKey].getValue().length).toEqual(0);
    service.saveContact(mockContact).subscribe(contact => {
      expect(contact._id).toBeDefined();
      expect(contact.firstName).toEqual(mockContact.firstName);
      expect(service[dataKey].getValue().length).toEqual(1);
    });
  });
});
