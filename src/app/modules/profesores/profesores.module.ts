import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfesoresComponent } from './profesores/profesores.component';

const routes: Routes = [
  {
      path: '',
      component: ProfesoresComponent
  }
];

@NgModule({
  declarations: [
    ProfesoresComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    ProfesoresComponent
  ]
})
export class ProfesoresModule { }
