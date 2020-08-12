import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  @Component({ selector: 'app-contact', template: '' })
  class ContactStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ContactStubComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
