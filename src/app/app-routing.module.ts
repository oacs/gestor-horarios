import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestAlgoritmoComponent } from './algoritmo/test-algoritmo/test-algoritmo.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'test',
        component: TestAlgoritmoComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
