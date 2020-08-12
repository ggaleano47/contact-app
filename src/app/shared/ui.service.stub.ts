import { Injectable } from '@angular/core';
import { UIService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class UIServiceStub extends UIService {
  constructor() {
    super(null);
  }
  showSnackbar(message: string): void {}
}
