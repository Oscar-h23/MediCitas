import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../admin/services/doctor.service';
import { CitasService } from '../../../features/cliente/services/citas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  usuario: any = null;
  doctores: any[] = [];
  doctoresOriginales: any[] = [];
  horariosDisponibles: string[] = [];

  nombreBusqueda = '';
  especialidadSeleccionada = '';
  doctorSeleccionado: any = null;
  fecha = '';
  hora = '';

  doctorService = inject(DoctorService);
  citaService  = inject(CitasService);
  router       = inject(Router);

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerDoctores();
  }

  /* =========================
     NAVEGACIÓN
  ========================= */

  irPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  irLogin(): void {
    this.router.navigate(['/login']);
  }

  logOut(): void {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.router.navigate(['/login']);
  }

  /* =========================
     USUARIO
  ========================= */

  obtenerUsuario(): void {
    const data = localStorage.getItem('usuario');
    if (data) {
      this.usuario = JSON.parse(data);
    }
  }

  /* =========================
     DOCTORES
  ========================= */

  obtenerDoctores(): void {
    this.doctorService.getDoctores().subscribe((resp: any) => {
      this.doctores = resp;
      this.doctoresOriginales = resp;
    });
  }

  filtrarDoctores(): void {
    this.doctores = this.doctoresOriginales.filter(doctor => {

      const coincideNombre = doctor.nombre
        .toLowerCase()
        .includes(this.nombreBusqueda.toLowerCase());

      const coincideEspecialidad =
        this.especialidadSeleccionada === '' ||
        doctor.especialidad === this.especialidadSeleccionada;

      return coincideNombre && coincideEspecialidad;
    });
  }

  seleccionarDoctor(doctor: any): void {
    this.doctorSeleccionado = doctor;
    this.fecha = '';
    this.hora = '';
    this.horariosDisponibles = [];
  }

  /* =========================
     HORARIOS
  ========================= */

  cargarHorarios(): void {
    if (!this.fecha) return;

    this.citaService
      .obtenerHorariosDisponibles(this.doctorSeleccionado.id, this.fecha)
      .subscribe((resp: any) => {
        this.horariosDisponibles = resp;
        this.hora = '';
      });
  }

  /* =========================
     AGENDAR CITA
  ========================= */

  agendarCita(): void {
    if (!this.fecha || !this.hora) {
      alert('Complete todos los campos');
      return;
    }

    if (!this.usuario) {
      alert('Debes iniciar sesión para reservar.');
      this.router.navigate(['/login']);
      return;
    }

    const nuevaCita = {
      doctorId:    this.doctorSeleccionado.id,
      doctor:      this.doctorSeleccionado.nombre,
      especialidad: this.doctorSeleccionado.especialidad,
      paciente:    this.usuario.name,
      fecha:       this.fecha,
      hora:        this.hora
    };

    this.citaService.crearCita(nuevaCita).subscribe({
      next: () => {
        alert('Cita registrada');
        // Cerrar modal Bootstrap
        const modal = document.getElementById('modalCita');
        if (modal) {
          const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
          bsModal?.hide();
        }
        this.cargarHorarios();
      },
      error: (err) => {
        alert(err.error?.mensaje || 'Error al agendar la cita.');
      }
    });
  }

}