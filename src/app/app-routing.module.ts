
import { NgModule, isDevMode } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestAlgoritmoComponent } from './algoritmo/test-algoritmo/test-algoritmo.component';
import { CoreModule } from './modules/core/core.module';
import { PensumModule } from './modules/pensum/pensum.module';
import { GestorModule } from './modules/gestor/gestor.module';

let routes: Routes = [
    {
        path: '',
        loadChildren:  './modules/core/core.module#CoreModule'

    },
    {
        path: 'pensum',
        loadChildren:  './modules/pensum/pensum.module#PensumModule'
    },
    {
        path: 'gestor',
        loadChildren: './modules/gestor/gestor.module#GestorModule'
    },
    {
        path: 'test',
        component: TestAlgoritmoComponent
    }
];
// if (!isDevMode()) {
//  routes 
// } else {
//      routes = [
//         {
//             path: '',
//             loadChildren: () => CoreModule
    
//         },
//         {
//             path: 'pensum',
//             loadChildren: () => PensumModule
//         },
//         {
//             path: 'gestor',
//             loadChildren: () => GestorModule
//         },
//         {
//             path: 'test',
//             component: TestAlgoritmoComponent
//         }
//     ];
// }

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
