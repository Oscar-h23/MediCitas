import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-cliente.component.html'
})
export class RegistroClienteComponent {

  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmarPassword: string = '';

  cargando: boolean = false;
  error: string = '';

  private apiUrl = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) {}

  registrar(): void {

    this.error = '';

    // Validaciones frontend
    if (!this.nombre || !this.email || !this.password || !this.confirmarPassword) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    const payload = {
      name: this.nombre,
      email: this.email,
      password: this.password
    };

    this.cargando = true;

    this.http.post(`${this.apiUrl}/register-cliente`, payload).subscribe({
      next: () => {
        this.cargando = false;
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.mensaje || 'Error al registrar. Intenta nuevamente.';
      }
    });

  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }

}