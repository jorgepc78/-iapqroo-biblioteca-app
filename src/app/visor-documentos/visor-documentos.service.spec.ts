import { TestBed, inject } from '@angular/core/testing';

import { VisorDocumentosService } from './visor-documentos.service';

describe('VisorDocumentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisorDocumentosService]
    });
  });

  it('should be created', inject([VisorDocumentosService], (service: VisorDocumentosService) => {
    expect(service).toBeTruthy();
  }));
});
