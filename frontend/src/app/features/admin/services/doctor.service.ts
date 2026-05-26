import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  http = inject(HttpClient);

  api = 'http://localhost:3000';

  getDoctores() {

    return this.http.get(
      `${this.api}/doctores`
    );

  }

  
}
