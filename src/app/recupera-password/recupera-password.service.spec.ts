import { TestBed, inject } from '@angular/core/testing';

import { RecuperaPasswordService } from './recupera-password.service';

describe('RecuperaPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecuperaPasswordService]
    });
  });

  it('should be created', inject([RecuperaPasswordService], (service: RecuperaPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
