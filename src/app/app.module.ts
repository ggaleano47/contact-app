import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { MaterialModule } from './shared/material.module';
import { UIService } from './shared/ui.service';

import { ContactModule } from './contact/contact.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ContactModule
  ],
  providers: [UIService],
  bootstrap: [AppComponent]
})
export class AppModule {}
