import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';
import {} from 'jasmine';

import { ContactComponent } from './contact.component';
import { ContactServiceStub } from './services/contact.service.stub';
import { ContactService } from './services/contact.service';
import { UIService } from '../shared/ui.service';
import { UIServiceStub } from '../shared/ui.service.stub';
import { mockContacts } from './interfaces/contact.mock';
import { Component, Input } from '@angular/core';
import { delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ContactDataSourceStub } from './services/contact-datasource.stub';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  @Component({ selector: 'app-contact-list', template: '' })
  class ContactListStubComponent {
    @Input() contactDataSource: ContactDataSourceStub;
  }

  @Component({ selector: 'app-contact-form', template: '' })
  class ContactFormStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactComponent,
        ContactListStubComponent,
        ContactFormStubComponent
      ],
      providers: [
        { provide: ContactService, useClass: ContactServiceStub },
        { provide: UIService, useClass: UIServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });

  it('should show the list and hide the form', () => {
    fixture.detectChanges();
    const compiledList = fixture.debugElement.nativeElement.querySelector(
      '#contact-list'
    );
    const compiledForm = fixture.debugElement.nativeElement.querySelector(
      '#contact-form'
    );
    expect(compiledList).toBeTruthy();
    expect(compiledForm).toBeFalsy();
  });

  it('should show the form and hide the list', () => {
    component.showList = false;
    fixture.detectChanges();
    const compiledList = fixture.debugElement.nativeElement.querySelector(
      '#contact-list'
    );
    const compiledForm = fixture.debugElement.nativeElement.querySelector(
      '#contact-form'
    );
    expect(compiledForm).toBeTruthy();
    expect(compiledList).toBeFalsy();
  });

  it('should fetch contacts when initialized', () => {
    const dataKey = 'contactService';
    spyOn(component[dataKey], 'fetchContacts').and.callThrough();
    component.ngOnInit();
    expect(component[dataKey].fetchContacts).toHaveBeenCalled();
  });

  it('Should show a snackbar with a success message and the contact list when contact is created successfully', fakeAsync(() => {
    const dataKeyUiService = 'uiService';
    const dataKeySuccessMsg = 'successMsg';
    spyOn(component[dataKeyUiService], 'showSnackbar');
    component.showList = false;
    component.createContact(mockContacts[0]);
    tick(1);
    expect(component.showList).toBeTruthy();
    expect(component[dataKeyUiService].showSnackbar).toHaveBeenCalledWith(
      component[dataKeySuccessMsg]
    );
  }));

  it('Should show a snackbar with an error message when occurred error creating the contact', fakeAsync(() => {
    const dataKeyContactService = 'contactService';
    const dataKeyUiService = 'uiService';
    const dataKeyFailMsg = 'failMsg';
    spyOn(component[dataKeyContactService], 'saveContact').and.returnValue(
      throwError('error').pipe(delay(1))
    );
    spyOn(component[dataKeyUiService], 'showSnackbar');
    component.showList = false;
    component.createContact(mockContacts[0]);
    tick(1);
    expect(component.showList).toBeFalsy();
    expect(component[dataKeyUiService].showSnackbar).toHaveBeenCalledWith(
      component[dataKeyFailMsg]
    );
  }));
});
