import { TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UIService } from './ui.service';

describe('UIService', () => {
  let service: UIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [UIService]
    });
    service = TestBed.inject(UIService);
  });

  it('should open the snackBar 3000 ms', () => {
    const dataKeySnackbar = 'snackbar';
    spyOn(service[dataKeySnackbar], 'open');
    const msg = 'message';
    service.showSnackbar(msg);
    expect(service[dataKeySnackbar].open).toHaveBeenCalledWith(msg, null, {
      duration: 3000
    });
  });
});
