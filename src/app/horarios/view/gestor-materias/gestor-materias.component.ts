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
  public semestreActivo: number;
  public posicion: number;

  constructor(private servicioConfiguracionHorario: ServicioConfiguracionHorariosService) {
    this.listaMateria = [];
    this.semestreActivo = 0;
  }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe(horario => {
      this.horarioActivo = horario;
      console.log(this.horarioActivo);
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe(lista => {
      this.listaProfesores = lista;
      console.log(this.listaProfesores);
    });
  }

  cargarInformacion(materia: MateriaClass, posicion: number) {
    this.materiaActiva = materia;
    this.posicion = posicion;
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
