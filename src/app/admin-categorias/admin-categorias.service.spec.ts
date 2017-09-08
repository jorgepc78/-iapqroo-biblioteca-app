import { TestBed, inject } from '@angular/core/testing';

import { AdminCategoriasService } from './admin-categorias.service';

describe('AdminCategoriasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCategoriasService]
    });
  });

  it('should be created', inject([AdminCategoriasService], (service: AdminCategoriasService) => {
    expect(service).toBeTruthy();
  }));
});
