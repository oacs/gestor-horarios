import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NavbarComponent } from './navbar/navbar.component';
import { AdministradorDragComponent } from './administrador-drag/administrador-drag.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule
  ],
  exports: [
    AdministradorDragComponent,
    NavbarComponent
  ],
  declarations: [ NavbarComponent, AdministradorDragComponent]
})
export class CoreModule { }
