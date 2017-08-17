import { TestBed, inject } from '@angular/core/testing';

import { EditaPresentacionService } from './edita-presentacion.service';

describe('EditaPresentacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaPresentacionService]
    });
  });

  it('should be created', inject([EditaPresentacionService], (service: EditaPresentacionService) => {
    expect(service).toBeTruthy();
  }));
});
