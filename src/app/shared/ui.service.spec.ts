import {} from 'jasmine';
import { TestBed } from '@angular/core/testing';
import { UIService } from './ui.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UIService', () => {
  let service: UIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [UIService]
    });
    service = TestBed.inject(UIService);
  });

  it('showSnackbar should open the snackBar', () => {
    const dataKeySnackbar = 'snackbar';
    spyOn(service[dataKeySnackbar], 'open');
    const msg = 'message';
    service.showSnackbar(msg);
    expect(service[dataKeySnackbar].open).toHaveBeenCalledWith(msg, null, {
      duration: 3000
    });
  });
});
