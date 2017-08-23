import { TestBed, inject } from '@angular/core/testing';

import { MiPerfilService } from './mi-perfil.service';

describe('MiPerfilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiPerfilService]
    });
  });

  it('should be created', inject([MiPerfilService], (service: MiPerfilService) => {
    expect(service).toBeTruthy();
  }));
});
