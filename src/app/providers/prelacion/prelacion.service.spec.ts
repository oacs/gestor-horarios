import { TestBed } from '@angular/core/testing';

import { PrelacionService } from './prelacion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfesorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PrelacionService],
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: PrelacionService = TestBed.get(PrelacionService);
    expect(service).toBeTruthy();
  });
});
