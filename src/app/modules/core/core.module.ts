import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Route } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AdministradorDragComponent } from './administrador-drag/administrador-drag.component';

const routes: Route[] = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AdministradorDragComponent,
    NavbarComponent
  ],
  declarations: [ HomeComponent, NavbarComponent, AdministradorDragComponent]
})
export class CoreModule { }
