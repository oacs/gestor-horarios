import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasComponent } from './views/materias/materias.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MateriasComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [MateriasComponent]
})
export class MateriasModule { }
