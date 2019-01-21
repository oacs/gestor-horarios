import { Component, OnInit } from '@angular/core';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';
import { Dias, Hora } from '../../../providers/algoritmo/enum';

@Component({
  selector: 'app-gestor-horarios',
  templateUrl: './gestor-horarios.component.html',
  styleUrls: ['./gestor-horarios.component.scss']
})
export class GestorHorariosComponent implements OnInit {
  horarioActivo: HorarioPeriodoClass;
  listaProfesores: ProfesorClass[];

  // enums
  public dias = Dias;
  public hora = Hora;

  public horario: number[][];

  constructor(private servicioConfiguracionHorario: ServicioConfiguracionHorariosService) {
    this.horario = [];
    for (let i = 0; i < 7; i++) {
      this.horario.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe(horario => {
      this.horarioActivo = horario;
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe(lista => {
      this.listaProfesores = lista;
    });
  }

}
