import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumComponent } from './views/pensum/pensum.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministradorDragComponent } from './components/administrador-drag/administrador-drag.component';

const routes: Routes = [
  {
    path: '',
    component: PensumComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PensumComponent, AdministradorDragComponent]
})
export class PensumModule { }
