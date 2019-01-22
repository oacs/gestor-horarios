import { Component, OnInit } from '@angular/core';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';
import { Dias, Hora } from '../../../providers/algoritmo/enum';
import { SeccionClass } from '../../../providers/algoritmo/seccionClass';

@Component({
  selector: 'app-gestor-horarios',
  templateUrl: './gestor-horarios.component.html',
  styleUrls: ['./gestor-horarios.component.scss']
})
export class GestorHorariosComponent implements OnInit {
  horarioActivo: HorarioPeriodoClass;
  listaProfesores: ProfesorClass[];
  public semestreActivo: number;

  // enums
  public dias = Dias;
  public hora = Hora;

  // [dia][hora][seccion]
  public horario: SeccionClass[][][];


  constructor(private servicioConfiguracionHorario: ServicioConfiguracionHorariosService) {
    this.horario = [];
    this.semestreActivo = 0;
    for (let i = 0; i < 7; i++) {
      // 7 dias con 14 bloques
      this.horario.push([[], [], [], [], [], [], [], [], [], [], [], [], [], []]);
    }
    this.horario[0][0].push(new SeccionClass('401'));
    console.log('​GestorHorariosComponent -> constructor -> this.horario[0][0].length', this.horario[0][0]);
  }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe(horario => {
      this.horarioActivo = horario;
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe(lista => {
      this.listaProfesores = lista;
    });
  }

  changeSemestre(numero: number) {
    if (this.semestreActivo + numero < 0) {
      this.semestreActivo = 0;
    } else {
      if (this.semestreActivo + numero > 9) {
        this.semestreActivo = 9;
      } else {
        this.semestreActivo += numero;
      }
    }
  }

}
