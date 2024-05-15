import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { FacturaComponent } from './components/factura/factura.component';

const routes: Routes = [
  {path:'', redirectTo:'/factura', pathMatch:'full'},
  {path:'login', component: LoginComponent, pathMatch:'full'},
  {path:'registrarCliente', component: RegistrarClienteComponent, pathMatch:'full'},
  {path:'home', component: HomeComponent, pathMatch:'full'},
  {path:'factura', component: FacturaComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
