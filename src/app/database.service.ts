import { Injectable } from '@angular/core';
import * as database from '../../node_modules/electron-db';
import { AppConfig } from '../environments/environment';
import { Pensum } from './algoritmo/pensum';
const db = database;

export interface Seccion {
  id: string;
  numero: string;
  horaio: string;
  periodo: string;
}

export interface Profesor {
  id: string;
  disp: string;
  nombre: string;
  correo: string;
}

export interface Prelacion {
  id_prelada: string;
  id_prelante: string;
  id: string;
}
export interface Materia {
  nombre: string;
  semestre: number;
}

// tslint:disable-next-line:class-name
export interface Materia_x_Pensum {
  id_pensum: number;
  id_materia: number;

  delete();
  save();
}

export interface Pensum {
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public db;
  public tables: string[];
  constructor() {
    this.db = db;
    this.tables = AppConfig.tables;
    this.crearTablas();
  }

  public crearTablas(): void {
    const that = this;
    this.tables.forEach(table => {
      that.db.createTable(table, (succ, msg) => {
        // succ - boolean, tells if the call is successful
        console.log('Success: ' + succ);
        console.log('`Message: ' + msg);
      });
    });
  }

  public crearPensum(pensum: Pensum): boolean {
    let flag = false;
    this.db.insertTableContent('customers', pensum, (succ, msg) => {
      // succ - boolean, tells if the call is successful
      console.log('Success: ' + succ);
      console.log('Message: ' + msg);
      flag = succ;
    });
    return flag;
  }

}
