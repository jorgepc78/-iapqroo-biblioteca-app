import { TestBed, inject } from '@angular/core/testing';

import { AdminRevistasService } from './admin-revistas.service';

describe('AdminRevistasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminRevistasService]
    });
  });

  it('should be created', inject([AdminRevistasService], (service: AdminRevistasService) => {
    expect(service).toBeTruthy();
  }));
});
