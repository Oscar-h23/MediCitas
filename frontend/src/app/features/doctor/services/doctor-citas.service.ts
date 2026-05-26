import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorCitasService {

  private http = inject(HttpClient);
  private api = 'http://localhost:3000';

  getCitasPorDoctor(doctorId: number) {
    return this.http.get(`${this.api}/citas?doctorId=${doctorId}`);
  }

  cancelarCita(citaId: number) {
    return this.http.delete(`${this.api}/citas/${citaId}`);
  }
  cambiarEstado(citaId: number, estado: string) {
    return this.http.patch(`${this.api}/citas/${citaId}/estado`, { estado });
  }
}