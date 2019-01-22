import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private mensajeNotificacion = new BehaviorSubject<string>('');
  public mensajeActual = this.mensajeNotificacion.asObservable();

  constructor() {}

  mostrarNotificacion(mensajeNotificacion: string) {
    this.mensajeNotificacion.next(mensajeNotificacion);
  }

}
