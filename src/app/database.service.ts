import { Injectable } from '@angular/core';
import * as database from '../../node_modules/electron-db';
import { AppConfig } from '../environments/environment';
import { Pensum } from './algoritmo/pensum';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  id: string;
  nombre: string;
  semestre: string;
  horas: string;
  maxH: string;
}

// tslint:disable-next-line:class-name
export interface Materia_x_Pensum {
  id: string;
  id_pensum: string;
  id_materia: string;

  delete();
  save();
}

export interface Pensum {
  id: string;
  fecha: string;
  materias?: Materia[];
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public db;
  public tables: string[];
  constructor(private http: HttpClient) {
    this.db = db;
    this.tables = AppConfig.tables;
    // this.crearTablas();
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

  public getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(AppConfig.api + 'materias');
  }

  public getMateria(id: number): Observable<Materia> {
    return this.http.get<Materia>(AppConfig.api + 'materias/' + id);
  }

  public updateMateria(materia: Materia): Observable<any> {
    return this.http.put(AppConfig.api + 'materias/' + materia.id, materia );
  }

  public insertMateria(materia: Materia): Observable<any> {
    return this.http.post(AppConfig.api + 'materias/', materia );
  }

}
