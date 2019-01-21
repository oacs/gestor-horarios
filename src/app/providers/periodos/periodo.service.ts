import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment';

export interface Periodo {
  id?: number;
  nombre: string;
}

// export interface Curso {
//   id: number;
//   semestre: string;
//   seccion: string;
//   id_Periodo: number;
//   id_periodo: number;
//   id_materia: number;
// }

// export interface Prelacion {
//   id: number;
//   id_prelada: string;
//   id_prelante: string;
// }


// // tslint:disable-next-line:class-name
// export interface Periodo {
//   id: number;
//   nombre: string;
//   horario: string;
//   id_pensum: number;
// }

// Listo


@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient) {
  }

  public getPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(AppConfig.api + 'Periodos');
  }

  public getPeriodo(id: number): Observable<Periodo> {
    return this.http.get<Periodo>(AppConfig.api + 'Periodos/' + id);
  }

  public deletePeriodo(id: number): Observable<Periodo> {
    return this.http.delete<Periodo>(AppConfig.api + 'Periodos/' + id);
  }

  public updatePeriodo(periodo: Periodo): Observable<any> {
    return this.http.put(AppConfig.api + 'Periodos/' + periodo.id, periodo);
  }

  public insertPeriodo(periodo: Periodo): Observable<any> {
    return this.http.post(AppConfig.api + 'Periodos/', periodo);
  }
}
