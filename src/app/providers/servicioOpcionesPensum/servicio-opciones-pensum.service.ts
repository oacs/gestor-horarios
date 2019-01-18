import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Pensum } from '../pensum/pensum.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioOpcionesPensumService {
  private pensum = new BehaviorSubject<Pensum>({ id: -1, fecha: ''});
  public pensumActivo = this.pensum.asObservable();

  constructor() { }

  crearPensum(nuevoPensum: Pensum) {
    this.pensum.next(nuevoPensum);
    console.log('Crear pensum (servicio)');
  }

  modificarPensum(pensum: Pensum) {
    this.pensum.next(pensum);
    console.log('Modificar pensum (servicio)');
   }
}
