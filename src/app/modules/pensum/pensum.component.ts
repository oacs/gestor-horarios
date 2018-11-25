import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';

import { Materia } from '../../models/materia';

import { DatabaseService } from '../../database.service';

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
  materias : Materia[] ;
  materiasEnDrag : number;
  displayModalNuevo : String;
  displayModalImportar : String;
  displayModalModificar : String;
  
  @HostListener('window:resize',['$event'])
  onResize(event) {
    console.log(event.target.innerWidth);
  }

  constructor(private dbService: DatabaseService) { 
    this.materias = [ 
      new Materia('Matematica'), 
      new Materia('Introducción'), 
      new Materia('Plastilina'), 
      new Materia('Trigonometría'),
      new Materia('Programación') ];

    this.displayModalImportar = 'none';
    this.displayModalNuevo = 'none';
    this.displayModalModificar = 'none';
  }

  /* Cambia el tipo de display (cuando se presiona alguno de los botones) */
  toggleModal(id_modal : String) {
    if(id_modal === 'importar') {
      if(this.displayModalImportar == 'none') 
        this.displayModalImportar = 'block';
      else 
        this.displayModalImportar = 'none';
    } 

    if(id_modal === 'nuevaMateria') {
      if(this.displayModalNuevo == 'none') 
        this.displayModalNuevo = 'block';
      else 
        this.displayModalNuevo = 'none';
    }

    if(id_modal === 'modificar') {
      if(this.displayModalModificar == 'none') 
        this.displayModalModificar = 'block';
      else 
        this.displayModalModificar = 'none';
    }
  }
 
  /* Retorna el tipo de display para aplicar ngStyle sobre el modal */
  displayType(id_modal : String) {
    if(id_modal === 'importar') 
      return this.displayModalImportar;
    
    if(id_modal === 'nuevaMateria') 
      return this.displayModalNuevo

    if(id_modal === 'modificar')
      return this.displayModalModificar;
  }

  ngOnInit() {
    this.dbService.getMaterias().subscribe( data => {
      console.log(data);
    });
  }

}


