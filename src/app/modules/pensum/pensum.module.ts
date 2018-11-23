import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PensumComponent } from './pensum.component';
import { Routes, RouterModule } from '@angular/router';
import { PensumService } from './pensum.service';

const routes: Routes = [
  {
      path: '',
      component: PensumComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [PensumService],
  declarations: [PensumComponent]
})
export class PensumModule { }
