import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AdminComponent } from './components/admin/admin.component';
import { GestionarPersonaComponent } from './components/admin/gestionar-persona/gestionar-persona.component'
import { HttpClientModule } from '@angular/common/http';
import { PersonaService } from './services/persona.service';
import { GestionarServiciosComponent } from './components/admin/gestionar-servicios/gestionar-servicios.component';
import { ServiciosService } from './services/servicios.service';
import { GestionarProductosComponent } from './components/admin/gestionar-productos/gestionar-productos.component';
import { ProductosService } from './services/productos.service';
import { FormPersonaComponent } from './components/admin/gestionar-persona/form-persona/form-persona.component';
import { FormProductoComponent } from './components/admin/gestionar-productos/form-producto/form-producto.component';
import { FormServicioComponent } from './components/admin/gestionar-servicios/form-servicio/form-servicio.component';
import { GestionarInventarioComponent } from './components/admin/gestionar-inventario/gestionar-inventario.component';
import { FormInventarioComponent } from './components/admin/gestionar-inventario/form-inventario/form-inventario.component';
import { InventarioService } from './services/inventario.service';
import { FormCitasComponent } from './components/admin/gestionar-citas/form-citas/form-citas.component';


import { ReactiveFormsModule } from '@angular/forms';
import { TipoDocumentoService } from './services/tipoDocumento.service';
import {TipoProductoService } from  './services/tipoProducto.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovimientoInventarioService } from './services/movimientoInventario.service';
import { MovimientoInventarioComponent } from './components/admin/gestionar-inventario/movimiento-inventario/movimiento-inventario.component';
import { TipoMovimientoInventarioService } from './services/tipoMovimientoInventario.service';
import {  UsuarioXrolService } from './services/usuarioXrol.service'
import {  RolesService } from './services/roles.service'
import { UsuarioService } from './services/usuario.service';
import { GestionarCitasComponent } from './components/admin/gestionar-citas/gestionar-citas.component';
import { CitaService } from './services/cita.service';
import { DetalleCitaService } from './services/detalleCita.service';
import { EstadoService } from './services/estado.service';



// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';









@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AdminComponent,
    GestionarPersonaComponent,
    GestionarServiciosComponent,
    GestionarProductosComponent,
    FormPersonaComponent,
    FormProductoComponent,
    FormServicioComponent,
    GestionarInventarioComponent,
    FormInventarioComponent,
    HomeComponent,
    LoginComponent,
    MovimientoInventarioComponent,
    GestionarCitasComponent,
    FormCitasComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [PersonaService,ServiciosService,ProductosService,TipoDocumentoService,TipoProductoService,InventarioService,MovimientoInventarioService,TipoMovimientoInventarioService, UsuarioXrolService,RolesService,UsuarioService,CitaService,DetalleCitaService,EstadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
