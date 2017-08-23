import { TestBed, inject } from '@angular/core/testing';

import { ConsultaPublicacionesService } from './consulta-publicaciones.service';

describe('ConsultaPublicacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaPublicacionesService]
    });
  });

  it('should be created', inject([ConsultaPublicacionesService], (service: ConsultaPublicacionesService) => {
    expect(service).toBeTruthy();
  }));
});
