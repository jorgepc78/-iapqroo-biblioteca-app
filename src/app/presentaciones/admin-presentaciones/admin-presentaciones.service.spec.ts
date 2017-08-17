import { TestBed, inject } from '@angular/core/testing';

import { AdminPresentacionesService } from './admin-presentaciones.service';

describe('AdminPresentacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPresentacionesService]
    });
  });

  it('should be created', inject([AdminPresentacionesService], (service: AdminPresentacionesService) => {
    expect(service).toBeTruthy();
  }));
});
