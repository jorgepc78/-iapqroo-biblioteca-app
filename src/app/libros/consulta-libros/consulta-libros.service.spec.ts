import { TestBed, inject } from '@angular/core/testing';

import { ConsultaLibrosService } from './consulta-libros.service';

describe('ConsultaLibrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaLibrosService]
    });
  });

  it('should be created', inject([ConsultaLibrosService], (service: ConsultaLibrosService) => {
    expect(service).toBeTruthy();
  }));
});
