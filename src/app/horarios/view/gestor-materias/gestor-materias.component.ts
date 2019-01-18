import { Component, OnInit } from '@angular/core';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';

// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';

@Component({
  selector: 'app-gestor-materias',
  templateUrl: './gestor-materias.component.html',
  styleUrls: ['./gestor-materias.component.scss']
})
export class GestorMateriasComponent implements OnInit {
  horarioActivo: HorarioPeriodoClass;
  listaProfesores: ProfesorClass[];

  public listaMateria: Materia[];

  constructor(private servicioConfiguracionHorario: ServicioConfiguracionHorariosService) { }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe( horario => {
      this.horarioActivo = horario;
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe( lista => {
      this.horarioActivo = lista;
    });
  }

}
