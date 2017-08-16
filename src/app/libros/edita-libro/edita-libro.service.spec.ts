import { TestBed, inject } from '@angular/core/testing';

import { EditaLibroService } from './edita-libro.service';

describe('EditaLibroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaLibroService]
    });
  });

  it('should be created', inject([EditaLibroService], (service: EditaLibroService) => {
    expect(service).toBeTruthy();
  }));
});
