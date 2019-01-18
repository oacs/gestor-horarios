import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Pensum} from '../../../providers/pensum/pensum.service';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';

@Component({
  selector: 'app-gestor-secciones',
  templateUrl: './gestor-secciones.component.html',
  styleUrls: ['./gestor-secciones.component.scss']
})
export class GestorSeccionesComponent implements OnInit {

  public selectPensum: FormControl;
  public listaPensum: Pensum[];
  public listaMateria: Materia[];

  constructor() {

    this.selectPensum = new FormControl("");

   }

  ngOnInit() {
  }

  // carga archivo de pensum
  loadFile(){

  }

}
