import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorMateriasComponent } from './view/gestor-materias/gestor-materias.component';
import { GestorSeccionesComponent } from './view/gestor-secciones/gestor-secciones.component';
import { GestorHorariosComponent } from './view/gestor-horarios/gestor-horarios.component';

@NgModule({
  declarations: [GestorMateriasComponent, GestorSeccionesComponent, GestorHorariosComponent],
  imports: [
    CommonModule
  ]
})
export class HorariosModule { }
