
import { NgModule, isDevMode } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { MateriasModule } from './materias/materias.module';
import { PensumModule } from './pensum/pensum.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { HorariosModule } from './horarios/horarios.module';

let routes: Routes = [
    {
        path: 'horarios',
        loadChildren: './horarios/horarios.module#HorariosModule'
    },
    {
        path: 'pensum',
        loadChildren: './pensum/pensum.module#PensumModule'
    },
    {
        path: 'materias',
        loadChildren: './materias/materias.module#MateriasModule'
    },
    {
        path: 'profesores',
        loadChildren: './profesores/profesores.module#ProfesoresModule'
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
        {
            path: 'horarios',
            loadChildren: () => HorariosModule
        }
    ];
}

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
