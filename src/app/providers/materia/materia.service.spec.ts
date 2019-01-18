import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MateriaService } from './materia.service';

describe('MateriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [MateriaService],
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: MateriaService = TestBed.get(MateriaService);
    expect(service).toBeTruthy();
  });
});
