import { HomeComponent } from './modules/core/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestAlgoritmoComponent } from './algoritmo/test-algoritmo/test-algoritmo.component';
import { CoreModule } from './modules/core/core.module';
import { PensumModule } from './modules/pensum/pensum.module';
import { GestorModule } from './modules/gestor/gestor.module';


const routes: Routes = [
    {
        path: '',
        loadChildren: () => CoreModule
    },
    {
        path: 'pensum',
        loadChildren: () => PensumModule
    },
    {
        path: 'gestor',
        loadChildren: () => GestorModule
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
