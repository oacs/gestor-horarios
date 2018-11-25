import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Materia } from '../../../models/materia';

@Component({
  selector: 'app-administrador-drag',
  templateUrl: './administrador-drag.component.html',
  styleUrls: ['./administrador-drag.component.scss']
})
export class AdministradorDragComponent implements OnInit {

  @Input('grupoMaterias') grupoMaterias : Materia[];
  @Output() modal = new EventEmitter<String>(); 
  
  constructor() { 
  }

  abrirModal(id_modal : String) {
    this.modal.emit(id_modal);
  }

  ngOnInit() {
  }

}
