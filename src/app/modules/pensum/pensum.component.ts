import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';

import { DatabaseService, Materia, Pensum } from '../../database.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Semestre {
  numero: number;
  materias: Materia[];
}

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.scss']
})

@NgModule({
  imports: [
    AngularFontAwesomeModule
  ]
})

export class PensumComponent implements OnInit {
  public materias: Materia[];
  public info: Materia[];
  public limite: number;
  /**
   * @description guarda la posicion de comienzo del arreglo de info
   * @example materias: Materia[] = [ 0, 1, 2, 3, 4, 5]
   * y  limite: number = 2 por lo tanto se agrupan
   * de dos para pasar la informacion al hijo.
   * si posicion = 0 entonces info = [0, 1]
   * si posicion = 1 entonces info = [2, 3]
   * si posicion = n entonces info = [posicion * limite, (posicion * limite) + limite]
  */
  public posicion: number;
  public semestres: Semestre[];
  public materiasEnDrag: number;

  // Cestari con su modal chimbo
  public displayModalNuevo: string;
  public displayModalImportar: string;
  public displayModalModificar: string;
  
  public materiaForm: FormGroup;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log(event.target.innerWidth);
    if (event.target.innerWidth > 1300) {
      this.limite = 6;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 1300 && event.target.innerWidth > 1040) {
      this.limite = 5;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 1040 && event.target.innerWidth > 700) {
      this.limite = 4;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 700 && event.target.innerWidth > 580) {
      this.limite = 3;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 580 && event.target.innerWidth > 400) {
      this.limite = 2;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 400) {
      this.limite = 1;
      this.actualizarInfo();
      return;
    }
  }

  constructor(private dbService: DatabaseService, private formModal: FormBuilder) {
    this.semestres = [
      { numero: 1, materias: [] },
      { numero: 2, materias: [] },
      { numero: 3, materias: [] },
      { numero: 4, materias: [] },
      { numero: 5, materias: [] },
      { numero: 6, materias: [] },
      { numero: 7, materias: [] },
      { numero: 8, materias: [] },
      { numero: 9, materias: [] },
      { numero: 10, materias: [] }];
    this.materias = [];

    this.displayModalImportar = 'none';
    this.displayModalNuevo = 'none';
    this.displayModalModificar = 'none';

    this.materiaForm = this.formModal.group({
      nombre: ['', Validators.required],
      // horas: ['', Validators.required],
      // horasMax: ['', Validators.required]
    });
  }

  /* Cambia el tipo de display (cuando se presiona alguno de los botones) */
  public toggleModal(idModal: string) {
    if (idModal === 'importar') {
      if (this.displayModalImportar === 'none') {
        this.displayModalImportar = 'block';
      } else {
        this.displayModalImportar = 'none';
      }
    }

    if (idModal === 'nuevaMateria') {
      if (this.displayModalNuevo === 'none') {
        this.displayModalNuevo = 'block';
      } else {
        this.displayModalNuevo = 'none';
      }
    }

    if (idModal === 'modificar') {
      if (this.displayModalModificar === 'none') {
        this.displayModalModificar = 'block';
      } else {
        this.displayModalModificar = 'none';
      }
    }
  }

  /* Retorna el tipo de display para aplicar ngStyle sobre el modal */
  public displayType(idModal: String) {
    if (idModal === 'importar') {
      return this.displayModalImportar;
    }

    if (idModal === 'nuevaMateria') {
      return this.displayModalNuevo;
    }

    if (idModal === 'modificar') {
      return this.displayModalModificar;
    }
  }

  submitForm() {
    if (this.materiaForm.valid) {
      this.dbService.insertMateria(this.materiaForm.value).subscribe(data => {
        if (data === null) {
          this.materias.unshift(this.materiaForm.value);
          this.actualizarInfo();
          this.displayModalNuevo = 'none';
        }
      });
    }
  }


  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  public cambiarInfo(event: string) {
    switch (event) {
      case 'left':
        if (this.posicion !== 0) {
          this.posicion--;
        }
        break;
      case 'right':
        if (this.posicion < (this.materias.length / this.limite) - 1) {
          this.posicion++;
        }
        break;
    }
    this.actualizarInfo();
  }

  private actualizarInfo() {
    this.info = this.materias.slice(this.posicion * this.limite, (this.posicion * this.limite) + this.limite);
  }


  // private guardar() {
  //   this.materias.forEach( materia => {
  //     this.dbService.
  //   })
  // }

  ngOnInit() {
    this.dbService.getMaterias().subscribe(data => {
      this.materias = data;
      this.limite = 4;
      this.posicion = 0;
      this.actualizarInfo();
    });

  }

}


