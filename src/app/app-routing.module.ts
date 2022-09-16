import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { ADMIN_ROUTES } from './components/admin/admin-routing';
import { AdminComponent } from './components/admin/admin.component';
import { FormPersonaComponent } from './components/admin/gestionar-persona/form-persona/form-persona.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
   { path: 'admin', component: AdminComponent , children : ADMIN_ROUTES, canActivate: [AuthGuard] },
   { path: 'home', component: HomeComponent },
   { path: 'home/registroCliente', component:FormPersonaComponent},
   { path: 'home/login', component: LoginComponent },
   { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
