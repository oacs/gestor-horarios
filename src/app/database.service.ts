import { Injectable } from '@angular/core';
import * as database from '../../node_modules/electron-db';
import { AppConfig } from '../environments/environment';
import { Pensum } from './algoritmo/pensum';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const db = database;

export interface Curso {
  id: number;
  semestre: string;
  seccion: string;
  id_profesor: number;
  id_periodo: number;
  id_materia: number;
}
export interface Profesor {
  id: number;
  disp: string;
  nombre: string;
  correo: string;
}

export interface Prelacion {
  id: number;
  id_prelada: string;
  id_prelante: string;
}
export interface Materia {
  id: number;
  nombre: string;
<<<<<<< HEAD
  semestre: string;
  horas: string;
  maxH: string;
=======
  horas: number;
  maxH: number;
>>>>>>> origin/backend
}

// tslint:disable-next-line:class-name
export interface Periodo {
  id: number;
  nombre: string;
  horario: string;
  id_pensum: number;
}

export interface Pensum {
  id: number;
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

  // ------------------------Profesores-----------------------------
  public getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(AppConfig.api + 'profesores');
  }

  public getProfesor(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(AppConfig.api + 'profesores/' + id);
  }

  public updateProfesor(profesor: Profesor): Observable<any> {
    return this.http.put(AppConfig.api + 'profesores/' + profesor.id, profesor );
  }

  public insertProfesor(profesor: Profesor): Observable<any> {
    return this.http.post(AppConfig.api + 'profesores/', profesor );
  }

}
