import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../database.service';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Route[] = [
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [ DatabaseService]
})
export class HomeModule { }
