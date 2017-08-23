import { TestBed, inject } from '@angular/core/testing';

import { ConsultaPresentacionesService } from './consulta-presentaciones.service';

describe('ConsultaPresentacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaPresentacionesService]
    });
  });

  it('should be created', inject([ConsultaPresentacionesService], (service: ConsultaPresentacionesService) => {
    expect(service).toBeTruthy();
  }));
});
