
import { NgModule, isDevMode } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { MateriasModule } from './materias/materias.module';
import { PensumModule } from './pensum/pensum.module';
import { ProfesoresModule } from './profesores/profesores.module';

let routes: Routes = [

    {
        path: 'pensum',
        loadChildren: './pensum/pensum.module#PensumModule'
    },
    {
        path: 'gestor',
        loadChildren: './gestor/gestor.module#GestorModule'
    },
    {
        path: '',
        loadChildren: './home/home.module#HomeModule'
    }
];
if (isDevMode()) {
    routes = [
        {
            path: '',
            loadChildren: () => HomeModule
        },
        {
            path: 'materias',
            loadChildren: () => MateriasModule
        },
        {
            path: 'pensum',
            loadChildren: () => PensumModule
        },
        {
            path: 'profesores',
            loadChildren: () => ProfesoresModule
        },
    ];
}

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
