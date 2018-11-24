import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumComponent } from './pensum.component';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';

const routes: Routes = [
  {
      path: 'gestor',
      component: PensumComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule
  ],
  declarations: [ PensumComponent ]
})

export class PensumModule { }
