import { Component, OnInit } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';

import { DatabaseService, Materia } from '../../database.service';

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
    this.materias = [];
  }

  ngOnInit() {
    this.dbService.getMaterias().subscribe( data => {
      console.log(data);
      this.materias = data;
    });

    this.dbService.getMateria(1).subscribe( data => {
      console.log(data);
    });

    this.dbService.insertMateria({id: '4', nombre: 'introduccion',  semestre: '1'}).subscribe(data => {
      console.log(data);
    });

    this.dbService.updateMateria({id: '1', nombre: 'castellano',  semestre: '1'}).subscribe(data => {
      console.log(data);
    });
  }

}


