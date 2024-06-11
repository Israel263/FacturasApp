import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';
import { BuscarProductosComponent } from './components/buscar-productos/buscar-productos.component';
import { FacturaComponent } from './components/factura/factura.component';
import { VerFacturasComponent } from './components/ver-facturas/ver-facturas.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarClienteComponent,
    HomeComponent,
    BuscarClienteComponent,
    BuscarProductosComponent,
    FacturaComponent,
    VerFacturasComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
