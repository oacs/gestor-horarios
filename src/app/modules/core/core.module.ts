import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Route } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AdministradorDragComponent } from './administrador-drag/administrador-drag.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Route[] = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragDropModule
  ],
  exports: [
    AdministradorDragComponent,
    NavbarComponent
  ],
  declarations: [ HomeComponent, NavbarComponent, AdministradorDragComponent]
})
export class CoreModule { }
