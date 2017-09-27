import { TestBed, inject } from '@angular/core/testing';

import { EditaDocumentoService } from './edita-documento.service';

describe('EditaDocumentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaDocumentoService]
    });
  });

  it('should be created', inject([EditaDocumentoService], (service: EditaDocumentoService) => {
    expect(service).toBeTruthy();
  }));
});
