import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProfesorService, Profesor, HorarioPrevio } from '../../../providers/profesor/profesor.service';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
import { BloqueHoras } from '../../../providers/algoritmo/BloqueHoras';
import { Hora, Dias } from '../../../providers/algoritmo/enum';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { BloqueHorasToString, DisponibilidadToString } from '../../../providers/databaseTransalations/datoToString';
import { profesores } from '../../../providers/algoritmo/test';
import { FindValueSubscriber } from '../../../../../node_modules/rxjs/internal/operators/find';

// Generated by https://quicktype.io




@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {
  // enums
  public dias = Dias;
  public hora = Hora;
  public inputNombre: FormControl;
  public inputCorreo: FormControl;
  public newProfesor: boolean;
  public mostrarHorarioPasado: boolean[];
  public mostrarInput: boolean[];
  public buscador: FormGroup;
  public profesorSeleccionado: ProfesorClass;
  public profesores: Profesor[];
  public auxProfesores: Profesor[];
  public profesorForm: FormGroup;
  public horario: number[][];
  public profesorActive: number;
  public horariosPasados: HorarioPrevio[];
  public utilidades: HorarioPeriodoClass;

  constructor(
    private profesorService: ProfesorService,
    private fb: FormBuilder
  ) {
    this.horariosPasados = [];
    this.mostrarHorarioPasado = [];
    this.mostrarInput = [false,false];
    this.inputCorreo = new FormControl('');
    this.inputNombre = new FormControl('');
    this.utilidades = new HorarioPeriodoClass();
    this.buscador = this.fb.group({ texto: [''] });
    this.newProfesor = false;
    this.profesorSeleccionado = new ProfesorClass(0, '', '', '');
    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required]

    });
    this.profesorService.getProfesores().subscribe(profesores => {
      this.profesores = profesores;
      this.auxProfesores = profesores;
    });

    this.horario = [];
    for (let i = 0; i < 7; i++) {
      this.horario.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    this.buscador.get('texto').valueChanges.subscribe(cambio => {
      if (cambio === '') {
        this.profesores = this.auxProfesores;
      } else {
        this.profesores = this.auxProfesores.filter(
          profesor => profesor.nombre.toLocaleLowerCase().indexOf(cambio.toLocaleLowerCase()) >= 0 ? true : false);
      }
    });
  }

  ngOnInit() {
  }


  /*
    Muestra y oculta el modal para crear un nuevo profesor
  */
  showNewModal() {
    if (this.newProfesor === true) {
      this.newProfesor = false;
    } else {
      this.newProfesor = true;
    }
  }
  public selectProfesor(profesor: Profesor, indice: number) {
    this.horariosPasados = [];
    this.profesorSeleccionado = new ProfesorClass(profesor.id, profesor.nombre, profesor.correo, profesor.disp);
    console.log(this.profesorSeleccionado);
    this.clearHorario();
    if (this.profesorSeleccionado.disponibilidad.length > 0) {
      this.profesorSeleccionado.disponibilidad.forEach(bloque => {
        for (let i = bloque.inicio; i < bloque.fin; i++) {
          this.horario[bloque.dia][i] = bloque.prioridad;
        }
      });
    }
    this.profesorActive = indice;

    this.profesorService.getHorariosAnteriores(profesor.id).subscribe(horarios => {
      this.horariosPasados = horarios;
      this.mostrarHorarioPasado = [];
      this.horariosPasados.forEach(i => {
        this.mostrarHorarioPasado.push(false);
      });
      console.log(horarios);
    });
  }
  public cambiarPrioridad(cambio: number, i: number, j: number) {
    if (this.profesorSeleccionado.nombre !== '') {
      this.horario[i][j] += cambio;
      if (this.horario[i][j] < 0) {
        this.horario[i][j] = 2;
      } else {
        if (this.horario[i][j] > 2) {
          this.horario[i][j] = 0;
        }
      }
    }
  }
  public clearHorario(): void {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < this.horario[i].length; j++) {
        this.horario[i][j] = 0;
      }
    }
  }

  public guardarHorario(): void {
    let disp: BloqueHoras[] = [];
    for (let i = 0; i < this.horario.length; i++) {
      for (let j = 0; j < this.horario[i].length; j++) {
        if (this.horario[i][j] !== 0) {

          disp.push(new BloqueHoras(i, j, j + 1, this.horario[i][j]));
        }
      }
    }

    this.profesorService.updateProfesor(this.profesorSeleccionado).subscribe( msj => {
      console.log(msj);
    });

    disp = this.utilidades.compactarBloques(disp);

    DisponibilidadToString(disp);

    this.profesorService.updateProfesor({
      nombre: this.profesorSeleccionado.nombre,
      disp: DisponibilidadToString(disp),
      correo: this.profesorSeleccionado.correo,
      id: this.profesorSeleccionado.id
    }).subscribe(msj => {
      this.profesorSeleccionado.disponibilidad = disp;
    });
  }

  public guardarProfesor() {
    if (this.profesorForm.valid) {
      this.profesorService.insertProfesor(
        {
          nombre: this.profesorForm.get('nombre').value,
          correo: this.profesorForm.get('correo').value,
          disp: ''
        }
      ).subscribe(res => {
        console.log(res);
        this.auxProfesores.push({
          id: res.id,
          nombre: this.profesorForm.get('nombre').value,
          correo: this.profesorForm.get('correo').value,
          disp: ''
        });
        this.newProfesor = false;
        this.profesorForm.setValue({ nombre: '', correo: '' });
      });
    }
  }
  public eliminarProfesor() {
    this.profesorService.deleteProfesor(this.profesorSeleccionado.id).subscribe(res => {
      console.log(res);
      this.auxProfesores.splice(this.auxProfesores.indexOf(this.profesorSeleccionado) - 1, 1);
      // this.profesores.splice(this.profesores.indexOf(this.profesorSeleccionado), 1);
      this.profesorSeleccionado = new ProfesorClass(0, '', '', '');
    });
  }


  public mostrarTabla(i: number) {
    this.mostrarHorarioPasado[i] = !this.mostrarHorarioPasado[i];
  }

  public togleEdit(i:number){
    this.profesorSeleccionado.nombre = this.inputNombre.value;
    this.profesorSeleccionado.correo = this.inputCorreo.value; 

    if (this.mostrarInput[i]){
      this.mostrarInput[i] = false;
    }
    else{
      this.mostrarInput[i] = true;
      this.inputNombre.setValue(this.profesorSeleccionado.nombre);
      this.inputCorreo.setValue(this.profesorSeleccionado.correo);

    }
  }
  

}
