import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string): void {
    this.snackbar.open(message, null, { duration: 3000 });
  }
}
