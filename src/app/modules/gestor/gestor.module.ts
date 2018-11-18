import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorComponent } from './gestor.component';
import { SideContentContainerComponent } from './side-content-container/side-content-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: 'materias',
      component: GestorComponent,
      data: { content: 'materias'}
  },
  {
    path: 'profesores',
    component: GestorComponent,
    data: { content: 'profesores'}
},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GestorComponent, SideContentContainerComponent]
})
export class GestorModule { }
