import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumComponent } from './pensum.component';
import { Routes, RouterModule } from '@angular/router';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
      path: 'gestor',
      component: PensumComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule.forChild(routes),
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ PensumComponent ]
})

export class PensumModule { }
