import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';

import { DatabaseService, Materia } from '../../database.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  materias: Materia[];
  semestres: Semestre[];
  materiasEnDrag: number;
  displayModalNuevo: String;
  displayModalImportar: String;
  displayModalModificar: String;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
  }

  constructor(private dbService: DatabaseService) {
    this.semestres = [
      { numero: 1, materias: [{nombre: 'Hola', id: '2', semestre: '1'}] },
      { numero: 2, materias: [] },
      { numero: 3, materias: [] },
      { numero: 4, materias: [] },
      { numero: 5, materias: [] },
      { numero: 6, materias: [] },
      { numero: 7, materias: [] },
      { numero: 8, materias: [] },
      { numero: 9, materias: [] },
      { numero: 10, materias: [] }];
    this.materias = [
      { id: '1', nombre: 'Matematicas', semestre: '1' },
      { id: '2', nombre: 'Plastilina', semestre: '2' },
      { id: '3', nombre: 'Manualidades', semestre: '3' },
      { id: '4', nombre: 'Colores', semestre: '4' },
      { id: '5', nombre: 'Mapas', semestre: '5' },
    ];

    this.displayModalImportar = 'none';
    this.displayModalNuevo = 'none';
    this.displayModalModificar = 'none';
  }

  /* Cambia el tipo de display (cuando se presiona alguno de los botones) */
  toggleModal(id_modal: String) {
    if (id_modal === 'importar') {
      if (this.displayModalImportar === 'none') {
        this.displayModalImportar = 'block';
      } else {
        this.displayModalImportar = 'none';
      }
    }

    if (id_modal === 'nuevaMateria') {
      if (this.displayModalNuevo === 'none') {
        this.displayModalNuevo = 'block';
      } else {
        this.displayModalNuevo = 'none';
      }
    }

    if (id_modal === 'modificar') {
      if (this.displayModalModificar === 'none') {
        this.displayModalModificar = 'block';
      } else {
        this.displayModalModificar = 'none';
      }
    }
  }

  /* Retorna el tipo de display para aplicar ngStyle sobre el modal */
  displayType(id_modal: String) {
    if (id_modal === 'importar') {
      return this.displayModalImportar;
    }

    if (id_modal === 'nuevaMateria') {
      return this.displayModalNuevo;
    }

    if (id_modal === 'modificar') {
      return this.displayModalModificar;
    }
  }

  /* Drag and drop */
  // drop(ev) {
  //   ev.preventDefault();
  //   console.log(ev);
  //   const data = ev.dataTransfer.getData('text');
  //   ev.target.append(document.getElementById(data));
  // }

  drop(event: CdkDragDrop<string[]>) {
    console.log( event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  ngOnInit() {
    this.dbService.getMaterias().subscribe(data => {
      console.log(data);
      this.materias = data;
    });

    // this.dbService.getMateria(1).subscribe( data => {
    //   console.log(data);
    // });

    // this.dbService.insertMateria({id: '4', nombre: 'introduccion',  semestre: '1'}).subscribe(data => {
    //   console.log(data);
    // });

    // this.dbService.updateMateria({id: '1', nombre: 'castellano',  semestre: '1'}).subscribe(data => {
    //   console.log(data);
    // });
  }

}


