import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment';

export interface Materia {
  id: number;
  nombre: string;
  semestre?: string;
  horas?: string;
  maxH?: string;
  prelaciones?: Materia[];
}

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient) {
  }

  public getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(AppConfig.api + 'materias');
  }

  public getMateria(id: number): Observable<Materia> {
    return this.http.get<Materia>(AppConfig.api + 'materias/' + id);
  }

  public updateMateria(materia: Materia, id: number): Observable<any> {
    return this.http.put(AppConfig.api + 'materias/' + id, materia);
  }

  public insertMateria(materia: Materia): Observable<any> {
    return this.http.post(AppConfig.api + 'materias/', materia);
  }

  public deleteMateria(materia: Materia): Observable<any> {
    return this.http.delete(AppConfig.api + 'materias/' + materia.id);
  }
}
