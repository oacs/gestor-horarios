import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment';

export interface Profesor {
  id: number;
  disp: string;
  nombre: string;
  correo: string;
}

// export interface Curso {
//   id: number;
//   semestre: string;
//   seccion: string;
//   id_profesor: number;
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




@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) {
  }

  public getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(AppConfig.api + 'profesores');
  }

  public getProfesor(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(AppConfig.api + 'profesores/' + id);
  }

  public updateProfesor(profesor: Profesor): Observable<any> {
    return this.http.put(AppConfig.api + 'profesores/' + profesor.id, profesor);
  }

  public insertProfesor(profesor: Profesor): Observable<any> {
    return this.http.post(AppConfig.api + 'profesores/', profesor);
  }
}
