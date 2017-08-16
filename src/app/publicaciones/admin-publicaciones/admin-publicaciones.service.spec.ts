import { TestBed, inject } from '@angular/core/testing';

import { AdminPublicacionesService } from './admin-publicaciones.service';

describe('AdminPublicacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPublicacionesService]
    });
  });

  it('should be created', inject([AdminPublicacionesService], (service: AdminPublicacionesService) => {
    expect(service).toBeTruthy();
  }));
});
