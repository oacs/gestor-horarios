import { TestBed } from '@angular/core/testing';

import { ServicioOpcionesPensumService } from './servicio-opciones-pensum.service';

describe('ServicioOpcionesPensumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioOpcionesPensumService = TestBed.get(ServicioOpcionesPensumService);
    expect(service).toBeTruthy();
  });
});
