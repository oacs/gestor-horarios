import { Component, OnInit } from '@angular/core';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';

// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
import { MateriaClass } from '../../../providers/algoritmo/materiaClass';
import { SeccionClass } from '../../../providers/algoritmo/seccionClass';

@Component({
  selector: 'app-gestor-materias',
  templateUrl: './gestor-materias.component.html',
  styleUrls: ['./gestor-materias.component.scss']
})
export class GestorMateriasComponent implements OnInit {
  horarioActivo: HorarioPeriodoClass;
  listaProfesores: ProfesorClass[];

  public materiaActiva: MateriaClass;
  public listaMateria: Materia[];
  public seccionesActivas: SeccionClass[];

  constructor(private servicioConfiguracionHorario: ServicioConfiguracionHorariosService) { }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe( horario => {
      this.horarioActivo = horario;
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe( lista => {
      this.horarioActivo = lista;
    });
  }

  cargarInformacion(materia: MateriaClass){
    
    this.materiaActiva = materia;
    this.seccionesActivas = materia.secciones;

  }

}
