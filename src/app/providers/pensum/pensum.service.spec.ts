import { TestBed } from '@angular/core/testing';

import { PensumService } from './pensum.service';

describe('PensumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PensumService = TestBed.get(PensumService);
    expect(service).toBeTruthy();
  });
});
