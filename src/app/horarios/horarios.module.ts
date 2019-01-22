import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorMateriasComponent } from './view/gestor-materias/gestor-materias.component';
import { GestorSeccionesComponent } from './view/gestor-secciones/gestor-secciones.component';
import { GestorHorariosComponent } from './view/gestor-horarios/gestor-horarios.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartaMateriaComponent } from './components/carta-materia/carta-materia.component';
import { TablaHorarioComponent } from './components/tabla-horario/tabla-horario.component';

const routes: Routes = [
  {
    path: 'paso1',
    component: GestorSeccionesComponent
  },
  {
    path: 'paso2',
    component: GestorMateriasComponent
  },
  {
    path: 'paso3',
    component: GestorHorariosComponent
  }
];

@NgModule({
  declarations: [GestorMateriasComponent, GestorSeccionesComponent, GestorHorariosComponent, CartaMateriaComponent, TablaHorarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HorariosModule { }
