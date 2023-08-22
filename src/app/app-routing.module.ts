import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path:"", component:HomeComponent, pathMatch: 'full'},
  {path:"employees", loadChildren:()=>import('./employees/employees.module').then(employees=> employees.EmployeesModule)},
  {path:"contact", component:ContactComponent},
  {path:"clients", component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
