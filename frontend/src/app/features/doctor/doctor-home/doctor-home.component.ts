import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorCitasService } from '../services/doctor-citas.service';

@Component({
  selector: 'app-doctor-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-home.component.html',
  styleUrl: './doctor-home.component.css'
})
export class DoctorHomeComponent implements OnInit {

  usuario: any = null;
  citas: any[] = [];
  citasFiltradas: any[] = [];
  filtroActivo = 'todas';

  citasService = inject(DoctorCitasService);
  router       = inject(Router);

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citasService.getCitasPorDoctor(this.usuario.doctorId).subscribe((resp: any) => {
      this.citas = resp;
      this.aplicarFiltro(this.filtroActivo);
    });
  }

  aplicarFiltro(filtro: string): void {
    this.filtroActivo = filtro;
    const hoy = new Date().toISOString().split('T')[0];

    if (filtro === 'hoy') {
      this.citasFiltradas = this.citas.filter(c => c.fecha === hoy);
    } else if (filtro === 'proximas') {
      this.citasFiltradas = this.citas.filter(c => c.fecha > hoy);
    } else if (filtro === 'pasadas') {
      this.citasFiltradas = this.citas.filter(c => c.fecha < hoy);
    } else {
      this.citasFiltradas = [...this.citas];
    }
  }

  /* =========================
     MARCAR COMO ATENDIDA
  ========================= */

  marcarAtendida(citaId: number): void {
    this.citasService.cambiarEstado(citaId, 'atendida').subscribe(() => {
      this.cargarCitas();
    });
  }

  cancelarCita(citaId: number): void {
    if (!confirm('¿Cancelar esta cita?')) return;
    this.citasService.cancelarCita(citaId).subscribe(() => {
      this.cargarCitas();
    });
  }

  logOut(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }

  /* =========================
     BADGES POR FECHA
  ========================= */

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

  contarHoy(): number {
    const hoy = new Date().toISOString().split('T')[0];
    return this.citas.filter(c => c.fecha === hoy).length;
  }

  contarProximas(): number {
    const hoy = new Date().toISOString().split('T')[0];
    return this.citas.filter(c => c.fecha > hoy).length;
  }
}