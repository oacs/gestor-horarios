import { Injectable } from '@angular/core';
import { Materia } from '../materia/materia.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment';
export interface Pensum {
  id: number;
  fecha: string;
  materias?: Materia[];
}

// Listo
@Injectable({
  providedIn: 'root'
})
export class PensumService {

  constructor(private http: HttpClient) {
  }

  public getPensums(): Observable<Pensum[]> {
    return this.http.get<Pensum[]>(AppConfig.api + 'pensum');
  }

  public getPensum(id: number): Observable<Pensum> {
    return this.http.get<Pensum>(AppConfig.api + 'pensum/' + id);
  }

  public updatePensum(pensum: Pensum, id: number): Observable<any> {
    return this.http.put(AppConfig.api + 'pensum/' + id, pensum);
  }

  public insertPensum(pensum: Pensum): Observable<any> {
    return this.http.post(AppConfig.api + 'pensum/', pensum);
  }

  public deletePensum(pensum: Pensum): Observable<any> {
    return this.http.delete(AppConfig.api + 'pensum/' + pensum.id);
  }
}
