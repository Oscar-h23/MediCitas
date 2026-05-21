import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  api = 'http://localhost:3000';

  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }
  getUsuario() {
    return JSON.parse(
      localStorage.getItem('usuario') || '{}'
    );
  }

}