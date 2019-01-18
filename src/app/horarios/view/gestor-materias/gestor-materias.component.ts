import { Component, OnInit } from '@angular/core';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';


@Component({
  selector: 'app-gestor-materias',
  templateUrl: './gestor-materias.component.html',
  styleUrls: ['./gestor-materias.component.scss']
})
export class GestorMateriasComponent implements OnInit {

  public listaMateria: Materia[];


  constructor() { }

  ngOnInit() {
  }

}
