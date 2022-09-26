import { Routes } from '@angular/router';
import { GestionarPersonaComponent } from './gestionar-persona/gestionar-persona.component';
import { GestionarServiciosComponent } from'./gestionar-servicios/gestionar-servicios.component';
import { GestionarProductosComponent } from './gestionar-productos/gestionar-productos.component';
import { GestionarInventarioComponent } from './gestionar-inventario/gestionar-inventario.component';
import { GestionarCitasComponent } from './gestionar-citas/gestionar-citas.component';

import { FormPersonaComponent } from './gestionar-persona/form-persona/form-persona.component';
import { FormProductoComponent } from './gestionar-productos/form-producto/form-producto.component';
import { FormServicioComponent } from './gestionar-servicios/form-servicio/form-servicio.component';
import { FormInventarioComponent } from './gestionar-inventario/form-inventario/form-inventario.component';
import { FormCitasComponent } from './gestionar-citas/form-citas/form-citas.component';

export const ADMIN_ROUTES: Routes = [
    {path: 'gestionarPersona' , component: GestionarPersonaComponent},
    {path: 'gestionarPersona/nuevo' , component : FormPersonaComponent},
    {path: 'gestionarPersona/editar/:id' , component:FormPersonaComponent},


    {path:'gestionarServicios',component:GestionarServiciosComponent},
    {path:'gestionarServicios/nuevo',component: FormServicioComponent},
    {path:'gestionarServicios/editar/:id',component: FormServicioComponent},



     {path:'gestionarProductos',component:GestionarProductosComponent},
     {path: 'gestionarProductos/nuevo' , component:FormProductoComponent},
     {path: 'gestionarProductos/editar/:id' , component:FormProductoComponent},


     {path:'gestionarInventario',component:GestionarInventarioComponent},
     {path: 'gestionarInventario/nuevo' , component:FormInventarioComponent},
     {path: 'gestionarInventario/editar/:id' , component:FormInventarioComponent},


     {path:'gestionarCitas',component:GestionarCitasComponent},
     {path: 'gestionarCitas/nuevo' , component:FormCitasComponent},
     {path: 'gestionarCitas/editar/:id' , component:FormCitasComponent},
     {path: 'gestionarCitas/eliminar/:id' , component:FormCitasComponent},
















 ]
