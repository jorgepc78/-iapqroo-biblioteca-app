import { TestBed, inject } from '@angular/core/testing';

import { EditaVideoService } from './edita-video.service';

describe('EditaVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaVideoService]
    });
  });

  it('should be created', inject([EditaVideoService], (service: EditaVideoService) => {
    expect(service).toBeTruthy();
  }));
});
