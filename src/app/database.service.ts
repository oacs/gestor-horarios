import { Injectable } from '@angular/core';
import * as database from '../../node_modules/electron-db';
import { NumericDictionary } from 'lodash';
const db = database;

export interface Seccion {
  id: string;
  numero: string;
  horaio: string;
  periodo: string;
}

export interface Materia {
  nombre   : string;
  semestre :number;
}

export interface Materia_x_Pensum {
  id_pensum : number;
  id_materia: number;

  delete();
  save();
}

export interface Pensum {
  fecha : string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public db;
  constructor() {
    this.db = db;
    this.db.createTable('pensum', (succ, msg) => {
      // succ - boolean, tells if the call is successful
      console.log('Success: ' + succ);
      console.log('Message: ' + msg);
    });
    
    this.db.createTable('materia',(succ, msg) => {

    });
    this.db.createTable('materia_x_pensum',(succ, msg) => {

    });
    this.db.createTable('pensum',(succ, msg) => {

    });
    console.log(db);
  }
}
