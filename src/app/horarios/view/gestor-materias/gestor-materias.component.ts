import { Component, OnInit } from '@angular/core';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';

// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
import { MateriaClass } from '../../../providers/algoritmo/materiaClass';
import { SeccionClass } from '../../../providers/algoritmo/seccionClass';
import { ProfesorService } from '../../../providers/profesor/profesor.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gestor-materias',
  templateUrl: './gestor-materias.component.html',
  styleUrls: ['./gestor-materias.component.scss']
})
export class GestorMateriasComponent implements OnInit {
  horarioActivo: HorarioPeriodoClass;
  listaProfesores: ProfesorClass[];

  public materiaActiva: MateriaClass;
  // public listaMateria: Materia[];
  public seccionesForm: FormGroup;
  public seccionesActivas: SeccionClass[];
  public semestreActivo: number;
  public posicion: number;

  constructor(
    private servicioConfiguracionHorario: ServicioConfiguracionHorariosService,
    private profesoresService: ProfesorService,
    private fb: FormBuilder
  ) {
    // this.listaMateria = [];
    this.semestreActivo = 0;
    this.seccionesForm = this.fb.group({});
    this.profesoresService.getProfesores().subscribe(profesores => {
      this.listaProfesores = [];
      profesores.forEach(profesor => {
        this.listaProfesores.push(new ProfesorClass(profesor.id, profesor.nombre, profesor.correo, profesor.disp));
      });
      this.servicioConfiguracionHorario.updateListaProfesores(this.listaProfesores);
    });
  }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe(horario => {
      this.horarioActivo = horario;
      // console.log(this.horarioActivo);
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe(lista => {
      this.listaProfesores = lista;
      // console.log(this.listaProfesores);
    });
  }

  cargarInformacion(materia: MateriaClass, posicion: number) {
    this.posicion = posicion;
    this.materiaActiva = materia;
    for (const control in this.seccionesForm.value) {
      if (this.seccionesForm.value.hasOwnProperty(control)) {
        this.seccionesForm.removeControl(control);
      }
    }
    this.materiaActiva.secciones.forEach(seccion => {
      this.seccionesForm.addControl(seccion.id, new FormControl(''));
      this.seccionesForm.get(seccion.id).valueChanges.subscribe(id => {
        const profesor = this.listaProfesores.filter(prof => prof.id === Number.parseInt(id, 10))[0];
        const indexMateria = this.horarioActivo.materiasPorSemestre[this.semestreActivo].indexOf(materia);
        const indexSeccion = this.horarioActivo.materiasPorSemestre[this.semestreActivo][indexMateria].secciones.indexOf(seccion);
        this.horarioActivo.materiasPorSemestre[this.semestreActivo][indexMateria].secciones[indexSeccion].profesor = profesor;
        console.log(this.horarioActivo.materiasPorSemestre[this.semestreActivo][indexMateria].secciones[indexSeccion].profesor);
      });
    });
    // console.log('Horaria');
    // console.log(this.horarioActivo.materiasPorSemestre);
    // console.log(this.posicion);
    // console.log('nepe');
    // console.log(this.horarioActivo.materiasPorSemestre[this.semestreActivo]);
    // console.log(this.horarioActivo.materiasPorSemestre[this.semestreActivo][posicion].secciones);
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

  selectProfesor(profesor: ProfesorClass, seccion: SeccionClass) {
    this.horarioActivo.materiasPorSemestre[this.semestreActivo][this.posicion]
      .secciones[this.horarioActivo.materiasPorSemestre[this.semestreActivo][this.posicion]
        .secciones.indexOf(seccion)].profesor = profesor;

    console.log(this.horarioActivo.materiasPorSemestre[this.semestreActivo][this.posicion]);
  }

}
