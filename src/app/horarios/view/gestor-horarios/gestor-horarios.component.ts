import { Component, OnInit } from '@angular/core';
import { HorarioPeriodo } from '../../../providers/algoritmo/horario-semestre';
import { Profesor } from '../../../providers/algoritmo/profesor';
// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';

@Component({
  selector: 'app-gestor-horarios',
  templateUrl: './gestor-horarios.component.html',
  styleUrls: ['./gestor-horarios.component.scss']
})
export class GestorHorariosComponent implements OnInit {
  horarioActivo: HorarioPeriodo;
  listaProfesores: Profesor[];

  constructor(private servicioConfiguracionHorario: ServicioConfiguracionHorariosService) {}

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe( horario => {
      this.horarioActivo = horario;
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe( lista => {
      this.horarioActivo = lista;
    });
  }

}
