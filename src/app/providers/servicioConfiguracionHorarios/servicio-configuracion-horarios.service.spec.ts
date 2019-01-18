import { TestBed } from '@angular/core/testing';

import { ServicioConfiguracionHorariosService } from './servicio-configuracion-horarios.service';

describe('ServicioConfiguracionHorariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioConfiguracionHorariosService = TestBed.get(ServicioConfiguracionHorariosService);
    expect(service).toBeTruthy();
  });
});
