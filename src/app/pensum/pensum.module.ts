import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumComponent } from './views/pensum/pensum.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministradorDragComponent } from './components/administrador-drag/administrador-drag.component';
import { PensumService } from '../providers/pensum/pensum.service';
import { OpcionesComponent } from './views/opciones/opciones.component';

const routes: Routes = [
  {
    path: 'gestor',
    component: PensumComponent
  },
  {
    path: 'opciones',
    component: OpcionesComponent
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
  declarations: [PensumComponent, AdministradorDragComponent, OpcionesComponent],
  providers: [PensumService]
})
export class PensumModule { }
