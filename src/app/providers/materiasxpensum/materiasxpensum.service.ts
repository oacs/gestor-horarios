import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Materia } from '../materia/materia.service';

export interface Materiaxpensum {
  id_materia: number;
  id_pensum: number;
}

@Injectable({
  providedIn: 'root'
})
export class MateriasxpensumService {

  constructor(private http: HttpClient) {
  }

  public getMateriasxpensum(): Observable<Materiaxpensum[]> {
    return this.http.get<Materiaxpensum[]>(AppConfig.api + 'materiasxpensum');
  }

  public getMateriasxPensumId(idPensum: number): Observable<Materia[]> {
    return this.http.get<Materia[]>(AppConfig.api + 'materiasxpensum/' + idPensum);
  }

  public insertMateria(idMateria: number, idPensum: number): Observable<any> {
    return this.http.post(AppConfig.api + 'materiasxpensum/', { idMateria: idMateria, idPensum: idPensum });
  }

  public deleteMateria(idMateria: number, idPensum: number): Observable<any> {
    return this.http.delete(AppConfig.api + `materiasxpensum/${idMateria}/${idPensum}`);
  }
}
