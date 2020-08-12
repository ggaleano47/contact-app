import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';

import { ContactComponent } from './contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

@NgModule({
  declarations: [ContactFormComponent, ContactListComponent, ContactComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [ContactFormComponent, ContactListComponent, ContactComponent],
  bootstrap: []
})
export class ContactModule {}
