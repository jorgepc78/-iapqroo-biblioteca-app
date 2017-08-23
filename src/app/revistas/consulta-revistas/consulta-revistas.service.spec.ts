import { TestBed, inject } from '@angular/core/testing';

import { ConsultaRevistasService } from './consulta-revistas.service';

describe('ConsultaRevistasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaRevistasService]
    });
  });

  it('should be created', inject([ConsultaRevistasService], (service: ConsultaRevistasService) => {
    expect(service).toBeTruthy();
  }));
});
