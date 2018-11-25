import { Component, OnInit, Input } from '@angular/core';
import { Materia} from '../../../database.service';

@Component({
  selector: 'app-administrador-drag',
  templateUrl: './administrador-drag.component.html',
  styleUrls: ['./administrador-drag.component.scss']
})
export class AdministradorDragComponent implements OnInit {

  @Input('grupoMaterias') grupoMaterias : Materia[];
  
  constructor() { 
  }

  ngOnInit() {
  }

}
