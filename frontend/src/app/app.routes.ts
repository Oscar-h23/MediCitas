import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

import { HomeComponent } from './pages/cliente/home/home.component';
import { RegistroClienteComponent } from './pages/cliente/registro-cliente/registro-cliente.component';
import { PerfilComponent } from './pages/cliente/perfil/perfil.component';
import { AdminComponent } from './pages/admin/HomeAdmin/admin.component';

import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registro-cliente',
    component: RegistroClienteComponent
    
  },
  { path: 'perfil', component: PerfilComponent },

  {
    path: 'cliente',
    component: HomeComponent,
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard]
  },


  {
    path: '**',
    redirectTo: ''
  }

];