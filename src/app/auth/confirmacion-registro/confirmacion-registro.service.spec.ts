import { TestBed, inject } from '@angular/core/testing';

import { ConfirmacionRegistroService } from './confirmacion-registro.service';

describe('ConfirmacionRegistroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmacionRegistroService]
    });
  });

  it('should be created', inject([ConfirmacionRegistroService], (service: ConfirmacionRegistroService) => {
    expect(service).toBeTruthy();
  }));
});
