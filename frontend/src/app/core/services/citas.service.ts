import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  http = inject(HttpClient);

  api = 'http://localhost:3000';

  /* =========================
     CREAR CITA
  ========================= */

  crearCita(data: any) {

    return this.http.post(

      `${this.api}/citas`,

      data

    );

  }
  cancelarCita(citaId: number) {
      
      return this.http.delete(
  
        `${this.api}/citas/${citaId}`
  
      );
  
    }

  /* =========================
     OBTENER TODAS LAS CITAS
  ========================= */

  obtenerCitas() {

    return this.http.get(

      `${this.api}/citas`

    );

  }

  /* =========================
     HORARIOS DISPONIBLES
  ========================= */

  obtenerHorariosDisponibles(
    doctorId: number,
    fecha: string
  ) {

    return this.http.get(

      `${this.api}/horarios-disponibles?doctorId=${doctorId}&fecha=${fecha}`

    );

  }
  

}