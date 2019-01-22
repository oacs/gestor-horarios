import { Component, OnInit } from '@angular/core';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';
import { Dias, Hora } from '../../../providers/algoritmo/enum';
import { SeccionClass } from '../../../providers/algoritmo/seccionClass';
import { MateriaClass } from '../../../providers/algoritmo/materiaClass';

@Component({
  selector: 'app-gestor-horarios',
  templateUrl: './gestor-horarios.component.html',
  styleUrls: ['./gestor-horarios.component.scss']
})
export class GestorHorariosComponent implements OnInit {
  horarioActivo: HorarioPeriodoClass;
  listaProfesores: ProfesorClass[];
  public semestreActivo: number;
  public minimenu: boolean;

  // enums
  public dias = Dias;
  public hora = Hora;

  // [dia][hora][seccion]
  public horario: SeccionClass[][][];
  public disponibilidad: number[][];

  public materiaActiva: MateriaClass;
  public SeccionActiva: SeccionClass;
  public seccionesSemestre: SeccionClass[];


  constructor(private servicioConfiguracionHorario: ServicioConfiguracionHorariosService) {
    this.horario = [];
    this.disponibilidad = [];
    this.semestreActivo = 0;
    this.minimenu = false;
    for (let i = 0; i < 7; i++) {
      // 7 dias con 14 bloques
      this.disponibilidad.push([]);
      this.disponibilidad[i].push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      this.horario.push([[], [], [], [], [], [], [], [], [], [], [], [], [], []]);
    }
    // this.horario[0][0].push(new SeccionClass('401'));
    console.log('​GestorHorariosComponent -> constructor -> this.horario[0][0].length', this.horario[0][0]);
  }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe(horario => {
      this.horarioActivo = horario;
      this.seccionesSemestre = [];
      this.horarioActivo.materiasPorSemestre[this.semestreActivo].forEach(materia => {
        materia.secciones.forEach(seccion => {
          seccion.idMateria = materia.id;
          this.seccionesSemestre.push(seccion);
        });
      });
      console.log(this.seccionesSemestre);
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
        this.seccionesSemestre = [];
        this.horarioActivo.materiasPorSemestre[this.semestreActivo].forEach(materia => {
          materia.secciones.forEach(seccion => {
            seccion.idMateria = materia.id;
            this.seccionesSemestre.push(seccion);
          });
        });
      }
    }
  }

  togleMinimenu() {
    if (this.minimenu) {
      this.minimenu = false;
    } else {
      this.minimenu = true;
    }
  }
  selectSeccion(seccion: SeccionClass) {
    // this.materiaActiva = this.horarioActivo.obtenerMateria(seccion.idMateria, )
    this.SeccionActiva = seccion;
    this.materiaActiva = this.horarioActivo.obtenerMateriaSinSemetre(seccion.idMateria);
    console.log('seccion: ');
    console.log(seccion);
    // console.log('materia: ');
    // console.log(this.materiaActiva);
    this.disponibilidad = [];
    for (let i = 0; i < 7; i++) {
      // 7 dias con 14 bloques
      this.disponibilidad.push([]);
      this.disponibilidad[i].push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    // console.log(this.horarioActivo.obtenerBloquesPosibles(this.materiaActiva.id, this.materiaActiva.semestre, this.SeccionActiva.id));
    this.horarioActivo.obtenerBloquesPosibles(this.materiaActiva.id, this.materiaActiva.semestre, this.SeccionActiva.id).forEach(bloque => {
      for (let i = bloque.inicio; i < bloque.fin; i++) {
        this.disponibilidad[bloque.dia][i] = 1;
      }
    });
    this.disponibilidad.forEach(dia => {
      dia.forEach(hora => {
        if (hora !== 1) {
          hora = 2;
        }
      });
    });
  }

}
