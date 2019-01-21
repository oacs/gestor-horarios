import { TestBed } from '@angular/core/testing';

import { PeriodoService } from './periodo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PeriodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PeriodoService],
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: PeriodoService = TestBed.get(PeriodoService);
    expect(service).toBeTruthy();
  });
});
