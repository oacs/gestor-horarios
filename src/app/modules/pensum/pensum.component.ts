import { Component, OnInit } from '@angular/core';
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

  constructor(private dbService: DatabaseService) { 
    this.materias = [ 
      new Materia('Matematica'), 
      new Materia('Introducción'), 
      new Materia('Plastilina'), 
      new Materia('Trigonometría'),
      new Materia('Programación') ]
  }

  ngOnInit() {
    this.dbService.getMaterias().subscribe( data => {
      console.log(data);
    });
  }

}


