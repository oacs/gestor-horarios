import { TestBed } from '@angular/core/testing';

import { MateriasxpensumService } from './materiasxpensum.service';

describe('MateriasxpensumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MateriasxpensumService = TestBed.get(MateriasxpensumService);
    expect(service).toBeTruthy();
  });
});
