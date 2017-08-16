import { TestBed, inject } from '@angular/core/testing';

import { UsuarioDataService } from './usuario-data.service';

describe('UsuarioDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioDataService]
    });
  });

  it('should be created', inject([UsuarioDataService], (service: UsuarioDataService) => {
    expect(service).toBeTruthy();
  }));
});
