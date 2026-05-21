import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuario: any = null;
  citas: any[] = [];
  doctores: any[] = [];
  cargando: boolean = false;
  error: string = '';

  tabActiva: 'pendientes' | 'pasadas' = 'pendientes';

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('usuario');

    if (!data) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = JSON.parse(data);
    this.cargarDatos();
  }
  irHome(): void {
    this.router.navigate(['/cliente']);
  }

  cargarDatos(): void {
    this.cargando = true;

    // Obtener doctores y citas en paralelo
    this.http.get<any[]>(`${this.apiUrl}/doctores`).subscribe({
      next: (doctores) => {
        this.doctores = doctores;

        this.http.get<any[]>(`${this.apiUrl}/citas?paciente=${this.usuario.name}`).subscribe({
          next: (citas) => {
            this.citas = citas;
            this.cargando = false;
          },
          error: () => {
            this.error = 'Error al cargar las citas.';
            this.cargando = false;
          }
        });
      },
      error: () => {
        this.error = 'Error al cargar los datos.';
        this.cargando = false;
      }
    });
  }

  get citasPendientes(): any[] {
    const hoy = new Date().toISOString().split('T')[0];
    return this.citas.filter(c => c.fecha >= hoy);
  }

  get citasPasadas(): any[] {
    const hoy = new Date().toISOString().split('T')[0];
    return this.citas.filter(c => c.fecha < hoy);
  }

  getNombreDoctor(doctorId: number): string {
    const doctor = this.doctores.find(d => d.id == doctorId);
    return doctor ? doctor.nombre : 'Doctor no encontrado';
  }

  getEspecialidadDoctor(doctorId: number): string {
    const doctor = this.doctores.find(d => d.id == doctorId);
    return doctor ? doctor.especialidad : '';
  }

  cancelarCita(id: number): void {
    if (!confirm('¿Estás seguro de cancelar esta cita?')) return;

    this.http.delete(`${this.apiUrl}/citas/${id}`).subscribe({
      next: () => {
        this.citas = this.citas.filter(c => c.id !== id);
      },
      error: () => {
        this.error = 'Error al cancelar la cita.';
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}