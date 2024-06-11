import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { FacturaComponent } from './components/factura/factura.component';
import { VerFacturasComponent } from './components/ver-facturas/ver-facturas.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component: LoginComponent, pathMatch:'full'},
  {path:'registrarCliente', component: RegistrarClienteComponent, pathMatch:'full'},
  {path:'home', component: HomeComponent, pathMatch:'full'},
  {path:'factura/:id', component: FacturaComponent, pathMatch:'full'},
  {path:'verFacturas', component: VerFacturasComponent, pathMatch:'full'},
  {path:'reportes', component: ReportesComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
