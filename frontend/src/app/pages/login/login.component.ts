import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

  auth = inject(AuthService);
  router = inject(Router);


  irARegistro() {
    this.router.navigate(['/registro-cliente']);
  }

  login() {

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe((resp: any) => {

      localStorage.setItem(
        'usuario',
        JSON.stringify(resp.usuario)
      );

      if (resp.usuario.rol === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/cliente']);
      }

    });

  }

}