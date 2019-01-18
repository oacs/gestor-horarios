import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HorarioPeriodoClass } from '../algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../algoritmo/profesorClass';
import { MateriaClass } from '../algoritmo/materiaClass';

@Injectable({
  providedIn: 'root'
})
export class ServicioConfiguracionHorariosService {
  private horarioPeriodo = new BehaviorSubject<HorarioPeriodoClass>(new HorarioPeriodoClass());
  public horarioActual = this.horarioPeriodo.asObservable();

  private lista: ProfesorClass[];
  private listaProfesores = new BehaviorSubject<ProfesorClass[]>(this.lista);
  public listaProfesoresActual = this.listaProfesores.asObservable();

  constructor() { }

  updateHorarioActual(horarioNuevo: HorarioPeriodoClass) {
    this.horarioPeriodo.next(horarioNuevo);
  }

  updateListaProfesores(nuevaLista: ProfesorClass[]) {
    this.listaProfesores.next(nuevaLista);
  }


}
