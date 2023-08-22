import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {getDatabase, provideDatabase } from "@angular/fire/database";


import { firebaseConfig } from '../appConfig';


import { CadastroEmployeesComponent } from './cadastroEmployees/cadastroEmployees.component';
import { EmployeesComponent } from './employees.component';
import { ListaEmployeesComponent } from 'src/app/employees/listaEmployees/listaEmployees.component';

const routes:Route[]=[
  {path:"",component:EmployeesComponent,
  children:[
    {path:'cadastro',loadComponent:()=> import('src/app/employees/cadastroEmployees/cadastroEmployees.component').then(cadastro=> cadastro.CadastroEmployeesComponent)},
    {path:'', redirectTo:"listagem", pathMatch:'full'},
    {path:'listagem',loadComponent:()=>import('src/app/employees/listaEmployees/listaEmployees.component').then(lista=>lista.ListaEmployeesComponent)},

  ]},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    provideFirebaseApp(()=> initializeApp( firebaseConfig)),
    provideDatabase(()=> getDatabase()),
    ListaEmployeesComponent
  ],
  declarations: [
    EmployeesComponent,
  ]
})
export class EmployeesModule {




}
