import { TestBed, inject } from '@angular/core/testing';

import { AdminDocumentosService } from './admin-documentos.service';

describe('AdminDocumentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminDocumentosService]
    });
  });

  it('should be created', inject([AdminDocumentosService], (service: AdminDocumentosService) => {
    expect(service).toBeTruthy();
  }));
});
