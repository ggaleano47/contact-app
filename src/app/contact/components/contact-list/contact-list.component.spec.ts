import {} from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ContactListComponent } from './contact-list.component';
import { ContactDataSourceStub } from '../../services/contact-datasource.stub';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [BrowserAnimationsModule, MatTableModule, MatToolbarModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    component.contactDataSource = new ContactDataSourceStub(null);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on initialization', () => {
    spyOn(component.dataSource, 'loadContacts');
    component.ngOnInit();
    expect(component.dataSource.loadContacts).toHaveBeenCalled();
  });

  it('should have the correct table headings', async () => {
    const expectedHeadings = [
      'First Name',
      'Last Name',
      'Company',
      'Email',
      'Phone',
      'Address'
    ];
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    expect(await headerRows[0].getCellTextByIndex()).toEqual(expectedHeadings);
  });

  it('should initially display one row in the table', async () => {
    const table = await loader.getHarness<MatTableHarness>(MatTableHarness);
    const rows = await table.getRows();
    expect(rows.length).toBe(1);
  });
});
