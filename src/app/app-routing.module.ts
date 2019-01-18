
import { NgModule, isDevMode } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './modules/core/core.module';
import { PensumModule } from './modules/pensum/pensum.module';
import { GestorModule } from './modules/gestor/gestor.module';
import { HomeModule } from './modules/home/home.module';
import { ProfesoresComponent } from './modules/profesores/profesores/profesores.component';

let routes: Routes = [
    {
        path: 'pensum',
        loadChildren:  './modules/pensum/pensum.module#PensumModule'
    },
    {
        path: 'gestor',
        loadChildren: './modules/gestor/gestor.module#GestorModule'
    },
    {
        path: '',
        loadChildren: './modules/home/home.module#HomeModule'
    },
    {
        path: 'profesores',
        loadChildren: './modules/profesores/profesores.module#ProfesoresModule'
    }
];
if (isDevMode()) {
     routes = [
        {
            path: 'pensum',
            loadChildren: () => PensumModule
        },
        {
            path: 'gestor',
            loadChildren: () => GestorModule
        },
        {
            path: '',
            loadChildren: () => HomeModule
        },
        {
            path: 'profesores',
            loadChildren: () => ProfesoresComponent
        }
    ];
}

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
