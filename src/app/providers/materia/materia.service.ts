import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment';
import { Materiaxpensum } from '../materiasxpensum/materiasxpensum.service';

export interface Materia {
  id: number;
  nombre: string;
  semestre?: number;
  horas?: number;
  maxH?: number;
  prelaciones?: Materia[];
  corequisitos?: Materia[];
}

// Listo

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient) {
  }

  public getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(AppConfig.api + 'materia');
  }

  public getMateria(id: number): Observable<Materia> {
    return this.http.get<Materia>(AppConfig.api + 'materia/' + id);
  }

  public getPrelantes(id: number): Observable<Materiaxpensum> {
    return this.http.get<Materiaxpensum>(AppConfig.api + 'materia/' + id + '/prelantes');
  }

  public getPrelandos(id: number): Observable<Materiaxpensum> {
    return this.http.get<Materiaxpensum>(AppConfig.api + 'materia/' + id + '/prelandos');
  }
  public updateMateria(materia: Materia, id: number): Observable<any> {
    return this.http.put(AppConfig.api + 'materia/' + id, materia);
  }

  public insertMateria(materia: Materia): Observable<any> {
    return this.http.post(AppConfig.api + 'materia/', materia);
  }

  public deleteMateria(materia: Materia): Observable<any> {
    return this.http.delete(AppConfig.api + 'materia/' + materia.id);
  }
}
