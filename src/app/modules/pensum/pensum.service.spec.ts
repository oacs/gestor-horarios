import { TestBed, inject } from '@angular/core/testing';

import { PensumService } from './pensum.service';

describe('PensumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PensumService]
    });
  });

  it('should be created', inject([PensumService], (service: PensumService) => {
    expect(service).toBeTruthy();
  }));
});
