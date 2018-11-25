import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Materia } from '../../../database.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-administrador-drag',
  templateUrl: './administrador-drag.component.html',
  styleUrls: ['./administrador-drag.component.scss']
})
export class AdministradorDragComponent implements OnInit {

  @Input() grupoMaterias: Materia[];
  @Output() modal = new EventEmitter<String>();

  constructor() {
  }

  abrirModal(id_modal: String) {
    this.modal.emit(id_modal);
  }

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

  ngOnInit() {
  }

}
