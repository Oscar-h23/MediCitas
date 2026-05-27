import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const doctorGuard: CanActivateFn = () => {

  const router = inject(Router);

  try {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario?.rol === 'doctor') {
      return true;
    }

    if (usuario?.rol === 'admin') router.navigate(['/admin']);
    else if (usuario?.rol === 'cliente') router.navigate(['/cliente']);
    else router.navigate(['/']);

    return false;

  } catch {
    router.navigate(['/']);
    return false;
  }

};