import { TestBed, inject } from '@angular/core/testing';

import { EditaPublicacionService } from './edita-publicacion.service';

describe('EditaPublicacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaPublicacionService]
    });
  });

  it('should be created', inject([EditaPublicacionService], (service: EditaPublicacionService) => {
    expect(service).toBeTruthy();
  }));
});
