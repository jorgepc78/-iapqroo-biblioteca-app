import { TestBed, inject } from '@angular/core/testing';

import { ConsultaDocumentosService } from './consulta-documentos.service';

describe('ConsultaDocumentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaDocumentosService]
    });
  });

  it('should be created', inject([ConsultaDocumentosService], (service: ConsultaDocumentosService) => {
    expect(service).toBeTruthy();
  }));
});
