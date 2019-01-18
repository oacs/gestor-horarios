import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Materia } from '../../../providers/materia/materia.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-administrador-drag',
  templateUrl: './administrador-drag.component.html',
  styleUrls: ['./administrador-drag.component.scss']
})
export class AdministradorDragComponent implements OnInit {

  @Input() grupoMaterias: Materia[];
  @Output() modal = new EventEmitter<string>();
  @Output() flechas = new EventEmitter<string>();
  @Output() guardar = new EventEmitter<string>();

  constructor() {
  }

  abrirModal(id_modal: string) {
    this.modal.emit(id_modal);
  }

  guardarPensum() {
    this.guardar.emit('guardar');
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  exit(event: any) {
    console.log(event);
  }

  ngOnInit() {
  }

}
