import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  usuario: any = null;
  tabActiva: 'dashboard' | 'doctores' | 'citas' | 'usuarios' = 'dashboard';

  // Datos
  doctores: any[] = [];
  citas: any[]    = [];
  usuarios: any[] = [];

  // Estado UI
  cargando = false;
  error    = '';
  modoForm: 'crear' | 'editar' | null = null;

  hoy = new Date().toISOString().split('T')[0];

  // Form doctor
  doctorForm: any = {
    nombre: '',
    especialidad: '',
    foto: '',
    horarios: ''
  };
  doctorEditandoId: number | null = null;

  private apiUrl = 'http://localhost:3000';
  http   = inject(HttpClient);
  router = inject(Router);

  /* =========================
     ESTADÍSTICAS BÁSICAS
  ========================= */

  get totalDoctores() { return this.doctores.length; }
  get totalCitas()    { return this.citas.length; }
  get totalUsuarios() { return this.usuarios.length; }

  get citasPendientes(): number {
    return this.citas.filter(c => c.estado === 'pendiente').length;
  }

  get citasCanceladas(): number {
    return this.citas.filter(c => c.estado === 'cancelada').length;
  }
  get citasAtendidas(): number {
    return this.citas.filter(c => c.estado === 'atendida').length;
  }

  get citasHoy(): number {
    return this.citas.filter(c => c.fecha === this.hoy).length;
  }

  get porcentajePendientes(): number {
    if (this.totalCitas === 0) return 0;
    return Math.round((this.citasPendientes / this.totalCitas) * 100);
  }
  
  get porcentajeAtendidas(): number {
    if (this.totalCitas === 0) return 0;
    return Math.round((this.citasAtendidas / this.totalCitas) * 100);
  }
  
  get porcentajeCanceladas(): number {
    if (this.totalCitas === 0) return 0;
    return Math.round((this.citasCanceladas / this.totalCitas) * 100);
  }

  /* =========================
     ESTADÍSTICAS AVANZADAS
  ========================= */

  get topPacientes(): any[] {
    const conteo: any = {};
    this.citas.forEach(c => {
      conteo[c.paciente] = (conteo[c.paciente] || 0) + 1;
    });
    return Object.entries(conteo)
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, 5);
  }

  get topDoctores(): any[] {
    const conteo: any = {};
    this.citas.forEach(c => {
      const nombre = c.doctor || `Doctor #${c.doctorId}`;
      conteo[nombre] = (conteo[nombre] || 0) + 1;
    });
    return Object.entries(conteo)
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, 5);
  }

  get topEspecialidades(): any[] {
    const conteo: any = {};
    this.citas.forEach(c => {
      const esp = c.especialidad || '—';
      conteo[esp] = (conteo[esp] || 0) + 1;
    });
    return Object.entries(conteo)
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a: any, b: any) => b.total - a.total);
  }

  get maxCitasPaciente(): number {
    return this.topPacientes.length > 0 ? (this.topPacientes[0].total as number) : 1;
  }

  get maxCitasDoctor(): number {
    return this.topDoctores.length > 0 ? (this.topDoctores[0].total as number) : 1;
  }

  /* =========================
     INIT
  ========================= */

  ngOnInit(): void {
    const data = localStorage.getItem('usuario');

    if (!data) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = JSON.parse(data);

    if (this.usuario.rol !== 'admin') {
      this.router.navigate(['/home']);
      return;
    }

    this.cargarTodo();
  }

  cargarTodo(): void {
    this.cargando = true;

    forkJoin({
      doctores: this.http.get<any[]>(`${this.apiUrl}/doctores`),
      citas:    this.http.get<any[]>(`${this.apiUrl}/citas`),
      usuarios: this.http.get<any[]>(`${this.apiUrl}/usuarios`)
    }).subscribe({
      next: ({ doctores, citas, usuarios }) => {
        this.doctores = doctores;
        this.citas    = citas;
        this.usuarios = usuarios;
        this.cargando = false;
      },
      error: () => {
        this.error    = 'Error al cargar los datos.';
        this.cargando = false;
      }
    });
  }

  /* =========================
     NAVEGACIÓN
  ========================= */

  irHome(): void {
    this.router.navigate(['/home']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  /* =========================
     DOCTORES - FORM
  ========================= */

  abrirCrear(): void {
    this.modoForm = 'crear';
    this.doctorEditandoId = null;
    this.doctorForm = { nombre: '', especialidad: '', foto: '', horarios: '' };
  }

  abrirEditar(doctor: any): void {
    this.modoForm = 'editar';
    this.doctorEditandoId = doctor.id;
    this.doctorForm = {
      nombre:       doctor.nombre,
      especialidad: doctor.especialidad,
      foto:         doctor.foto,
      horarios:     doctor.horarios.join(', ')
    };
  }

  cerrarForm(): void {
    this.modoForm = null;
    this.doctorEditandoId = null;
    this.doctorForm = { nombre: '', especialidad: '', foto: '', horarios: '' };
  }

  guardarDoctor(): void {
    if (!this.doctorForm.nombre || !this.doctorForm.especialidad) {
      alert('Nombre y especialidad son requeridos.');
      return;
    }

    const payload = {
      nombre:       this.doctorForm.nombre,
      especialidad: this.doctorForm.especialidad,
      foto:         this.doctorForm.foto,
      horarios:     this.doctorForm.horarios
                      .split(',')
                      .map((h: string) => h.trim())
                      .filter((h: string) => h !== '')
    };

    if (this.modoForm === 'crear') {
      this.http.post(`${this.apiUrl}/doctores`, payload).subscribe({
        next: (nuevo: any) => {
          this.doctores.push(nuevo);
          this.cerrarForm();
          alert('Doctor creado correctamente.');
        },
        error: () => alert('Error al crear doctor.')
      });
    } else {
      this.http.put(`${this.apiUrl}/doctores/${this.doctorEditandoId}`, payload).subscribe({
        next: (actualizado: any) => {
          const idx = this.doctores.findIndex(d => d.id === this.doctorEditandoId);
          if (idx !== -1) this.doctores[idx] = actualizado;
          this.cerrarForm();
          alert('Doctor actualizado correctamente.');
        },
        error: () => alert('Error al actualizar doctor.')
      });
    }
  }

  /* =========================
     CITAS - CANCELAR
  ========================= */

  cancelarCita(id: number): void {
    if (!confirm('¿Cancelar esta cita?')) return;

    this.http.delete(`${this.apiUrl}/citas/${id}`).subscribe({
      next: () => {
        this.citas = this.citas.filter(c => c.id !== id);
      },
      error: () => alert('Error al cancelar la cita.')
    });
  }

  medallaEmoji(i: number): string {
    return i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '▸';
  }
  getBadgeClass(cita: any): string {

    const hoy = new Date().toISOString().split('T')[0];
  
    if (cita.estado === 'atendida') {
      return 'bg-success';
    }
  
    if (cita.estado === 'cancelada') {
      return 'bg-danger';
    }
  
    if (cita.estado === 'pendiente') {
  
      if (cita.fecha < hoy) {
        return 'bg-dark';
      }
  
      if (cita.fecha === hoy) {
        return 'bg-warning text-dark';
      }
  
      return 'bg-primary';
    }
  
    return 'bg-secondary';
  }
  getBadgeLabel(cita: any): string {

    const hoy = new Date().toISOString().split('T')[0];
  
    if (cita.estado === 'atendida') {
      return 'Atendida';
    }
  
    if (cita.estado === 'cancelada') {
      return 'Cancelada';
    }
  
    if (cita.estado === 'pendiente') {
  
      if (cita.fecha < hoy) {
        return 'Pendiente vencida';
      }
  
      if (cita.fecha === hoy) {
        return 'Pendiente · Hoy';
      }
  
      return 'Pendiente';
    }
  
    return 'Sin estado';
  }

}