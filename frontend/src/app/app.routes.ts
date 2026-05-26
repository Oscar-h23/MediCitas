import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';

import { HomeComponent } from './features/cliente/home/home.component';
import { RegistroClienteComponent } from './features/cliente/registro-cliente/registro-cliente.component';
import { PerfilComponent } from './features/cliente/perfil/perfil.component';
import { AdminComponent } from './features/admin/HomeAdmin/admin.component';
import { DoctorHomeComponent } from './features/doctor/doctor-home/doctor-home.component';

import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { doctorGuard } from './core/guards/doctor.guard';

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
    path: 'doctor',
    component: DoctorHomeComponent,
    canActivate: [authGuard, doctorGuard]
  },


  {
    path: '**',
    redirectTo: ''
  }

];