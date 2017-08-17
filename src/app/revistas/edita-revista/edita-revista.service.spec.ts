import { TestBed, inject } from '@angular/core/testing';

import { EditaRevistaService } from './edita-revista.service';

describe('EditaRevistaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaRevistaService]
    });
  });

  it('should be created', inject([EditaRevistaService], (service: EditaRevistaService) => {
    expect(service).toBeTruthy();
  }));
});
