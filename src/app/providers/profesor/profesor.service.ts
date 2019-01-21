import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../environments/environment';
import { BloqueHoras } from '../algoritmo/BloqueHoras';
import { stringToDisponibilidad } from '../databaseTransalations/stringToData';

export interface Profesor {
  id?: number;
  disp?: string;
  nombre: string;
  correo: string;
}
export interface HorarioPrevioIn {
  horario: string;
  periodo: string;
}

export interface HorarioPrevio {
  horario: BloqueHoras[];
  periodo: string;
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

// Listo


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

  public getHorariosAnteriores(id: number): Observable<HorarioPrevio[]> {
    return this.http.get<HorarioPrevioIn[]>(AppConfig.api + 'profesores/' + id + '/horariosAnteriores').pipe(
      map(items => {
        const horariosPrev: HorarioPrevio[] = [];
        items.forEach(item => {
          horariosPrev.push({
            horario: stringToDisponibilidad(item.horario),
            periodo: item.periodo
          });
        });
        return horariosPrev;
      })
    );
  }

  public deleteProfesor(id: number): Observable<Profesor> {
    return this.http.delete<Profesor>(AppConfig.api + 'profesores/' + id);
  }

  public updateProfesor(profesor: Profesor): Observable<any> {
    return this.http.put(AppConfig.api + 'profesores/' + profesor.id, profesor);
  }

  public insertProfesor(profesor: Profesor): Observable<any> {
    return this.http.post(AppConfig.api + 'profesores/', profesor);
  }
}
