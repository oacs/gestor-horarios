import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProfesorService, Profesor } from '../../../providers/profesor/profesor.service';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
import { BloqueHoras } from '../../../providers/algoritmo/BloqueHoras';
import { Hora } from '../../../providers/algoritmo/enum';


@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  newProfesor: boolean;
  public hora = Hora;
  public buscador: FormGroup;
  public profesorSeleccionado: ProfesorClass;
  public profesores: Profesor[];
  public auxProfesores: Profesor[];
  public profesorForm: FormGroup;
  public horario: number[][];

  constructor(
    private profesorService: ProfesorService,
    private fb: FormBuilder
  ) {
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

  public selectProfesor(profesor: Profesor) {
    this.profesorSeleccionado = new ProfesorClass(profesor.id, profesor.nombre, profesor.correo, profesor.disp);
    console.log(this.profesorSeleccionado);
    this.clearHorario();
    this.profesorSeleccionado.disponibilidad.forEach(bloque => {
      for (let i = bloque.inicio; i !== bloque.fin + 1; i++) {
        this.horario[bloque.dia][i] = bloque.prioridad;
      }
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
      this.horario[i].forEach(bloque => {
        bloque = 0;
      });
    }
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
      this.auxProfesores.splice(this.auxProfesores.indexOf(this.profesorSeleccionado) - 1);
      this.profesores.splice(this.profesores.indexOf(this.profesorSeleccionado) - 1);
      this.profesorSeleccionado = new ProfesorClass(0, '', '', '');
    });
  }

}
