import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment';

export interface Prelacion {
  id_prelacion?: number;
  id_prelada: number;
  id_prelante: number;
  id_pensum?: number;
  tipo?: number;
}

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
export class PrelacionService {

  constructor(private http: HttpClient) {
  }

  public getprelaciones(): Observable<Prelacion[]> {
    return this.http.get<Prelacion[]>(AppConfig.api + 'prelacion');
  }

  public getprelacion(id: number): Observable<Prelacion> {
    return this.http.get<Prelacion>(AppConfig.api + 'prelacion/' + id);
  }

  public deleteprelacion(id: number): Observable<Prelacion> {
    return this.http.delete<Prelacion>(AppConfig.api + 'prelacion/' + id);
  }

  public deleteprelacionByPensum(id: number): Observable<Prelacion> {
    return this.http.delete<Prelacion>(AppConfig.api + 'prelacion/' + id + '/byPensum');
  }

  public updateprelacion(prelacion: Prelacion): Observable<any> {
    return this.http.put(AppConfig.api + 'prelacion/' + prelacion, prelacion);
  }

  public insertprelacion(prelacion: Prelacion): Observable<any> {
    return this.http.post(AppConfig.api + 'prelacion/', prelacion);
  }
}
