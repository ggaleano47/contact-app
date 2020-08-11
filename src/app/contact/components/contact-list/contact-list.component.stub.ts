import { Component, Input } from '@angular/core';
import { ContactDataSourceStub } from '../../services/contact-datasource.stub';

@Component({ selector: 'app-contact-list', template: '' })
export class ContactListStubComponent {
  @Input() contactDataSource: ContactDataSourceStub;
}
