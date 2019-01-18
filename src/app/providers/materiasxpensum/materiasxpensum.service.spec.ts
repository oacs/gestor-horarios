import { TestBed } from '@angular/core/testing';

import { MateriasxpensumService } from './materiasxpensum.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MateriasxpensumService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [MateriasxpensumService],
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: MateriasxpensumService = TestBed.get(MateriasxpensumService);
    expect(service).toBeTruthy();
  });
});
