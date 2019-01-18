import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HorarioPeriodo } from '../algoritmo/horario-semestre';
import { Profesor } from '../algoritmo/profesor';
import { Materia } from '../algoritmo/materia';

@Injectable({
  providedIn: 'root'
})
export class ServicioConfiguracionHorariosService {
  private horarioPeriodo = new BehaviorSubject<HorarioPeriodo>(new HorarioPeriodo());
  public horarioActual = this.horarioPeriodo.asObservable();

  private lista: Profesor[];
  private listaProfesores = new BehaviorSubject<Profesor[]>(this.lista);
  public listaProfesoresActual = this.horarioPeriodo.asObservable();

  constructor() { }

  updateHorarioActual(horarioNuevo: HorarioPeriodo) {
    this.horarioPeriodo.next(horarioNuevo);
  }

  updateListaProfesores(nuevaLista: Profesor[]) {
    this.listaProfesores.next(nuevaLista);
  }


}
