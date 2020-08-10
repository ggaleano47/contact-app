import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MaterialModule } from '../shared/material.module';

import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactFormComponent, ContactListComponent, ContactComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, TextMaskModule],
  exports: [ContactFormComponent, ContactListComponent, ContactComponent],
  bootstrap: []
})
export class ContactModule {}
