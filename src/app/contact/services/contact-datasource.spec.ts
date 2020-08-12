import {} from 'jasmine';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ContactDataSource } from './contact-datasource';
import { ContactServiceStub } from './../services/contact.service.stub';
import { of } from 'rxjs';
import { mockContacts } from '../interfaces/contact.mock';

describe('ContactDataSource', () => {
  let datasource: ContactDataSource;

  beforeEach(() => {
    const contactService = new ContactServiceStub();
    datasource = new ContactDataSource(contactService);
  });

  it('should be able to retreive contacts from the service when connect', () => {
    const expectedContacts$ = datasource.connect(null);
    expectedContacts$.subscribe(contacts =>
      expect(contacts).toBe(mockContacts)
    );
  });

  it('should delete the subscription when disconnect', async () => {
    datasource.loadContacts();
    const dataKeySub = 'subContacts$';
    spyOn(datasource[dataKeySub], 'unsubscribe');
    datasource.disconnect(null);
    expect(datasource[dataKeySub].unsubscribe).toHaveBeenCalled();
  });
});
