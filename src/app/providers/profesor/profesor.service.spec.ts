import { TestBed } from '@angular/core/testing';

import { ProfesorService } from './profesor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfesorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProfesorService],
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: ProfesorService = TestBed.get(ProfesorService);
    expect(service).toBeTruthy();
  });
});
