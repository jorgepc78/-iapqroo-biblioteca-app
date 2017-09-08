import { TestBed, async, inject } from '@angular/core/testing';

import { ConfirmacionGuard } from './confirmacion.guard';

describe('ConfirmacionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmacionGuard]
    });
  });

  it('should ...', inject([ConfirmacionGuard], (guard: ConfirmacionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
