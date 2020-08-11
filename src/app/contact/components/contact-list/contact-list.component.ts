import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';
import { ContactDataSource } from '../../services/contact-datasource';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {
  @Input() contactDataSource: ContactDataSource;
  @Output()
  emitShowForm = new EventEmitter<void>();

  displayedColumns = [
    'firstName',
    'lastName',
    'company',
    'email',
    'phone',
    'address'
  ];
  dataSource: ContactDataSource;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.contactDataSource;
    this.dataSource.loadContacts();
  }

  emitAddContact(): void {
    this.emitShowForm.emit();
  }
}
