import { TestBed, inject } from '@angular/core/testing';

import { AdminLibrosService } from './admin-libros.service';

describe('AdminLibrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLibrosService]
    });
  });

  it('should be created', inject([AdminLibrosService], (service: AdminLibrosService) => {
    expect(service).toBeTruthy();
  }));
});
