import { Injectable } from '@angular/core';
// import * as database from '../../node_modules/electron-db';
import { AppConfig } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
// const db = database;

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
  semestre?: string;
  horas?: string;
  maxH?: string;
  prelaciones?: Materia[];
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
    // this.db = db;
    this.tables = AppConfig.tables;
    // this.crearTablas();
  }

  public getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(AppConfig.api + 'materias');
  }

  public getMateria(id: number): Observable<Materia> {
    return this.http.get<Materia>(AppConfig.api + 'materias/' + id);
  }

  public updateMateria(materia: Materia, id: number): Observable<any> {
    return this.http.put(AppConfig.api + 'materias/' + id, materia );
  }

  public insertMateria(materia: Materia): Observable<any> {
    return this.http.post(AppConfig.api + 'materias/', materia );
  }

  public deleteMateria(materia: Materia): Observable<any> {
    return this.http.delete(AppConfig.api + 'materias/' + materia.id );
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

  // Materia x pensum
  public getMateriasxPensum(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(AppConfig.api + 'profesores');
  }

  public getMateriaxPensum(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(AppConfig.api + 'profesores/' + id);
  }

  public insertMateriaxPensum(profesor: Profesor): Observable<any> {
    return this.http.post(AppConfig.api + 'profesores/', profesor );
  }

    // ------------------------Pensums-----------------------------
    public getPensums(): Observable<Pensum[]> {
      return this.http.get<Pensum[]>(AppConfig.api + 'pensum');
    }

    public getMateriasPensum(id: number): Observable<Materia[]> {

      const params = new HttpParams().set('id_pensum', id + '');
      return this.http.get<Materia[]>(AppConfig.api + 'pensum/materias', {params: params} );
    }
    public insertPensum(pensum: Pensum): Observable<any> {
      return this.http.post(AppConfig.api + 'pensum/', pensum );
    }
}
