import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasComponent } from './views/materias/materias.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MateriaService } from '../providers/materia/materia.service';

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
  declarations: [MateriasComponent],
  providers: [MateriaService]
})
export class MateriasModule { }
