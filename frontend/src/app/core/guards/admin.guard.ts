import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  try {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario?.rol === 'admin') {
      return true;
    }

    if (usuario?.rol === 'cliente') router.navigate(['/cliente']);
    else if (usuario?.rol === 'doctor') router.navigate(['/doctor']);
    else router.navigate(['/']);

    return false;

  } catch {
    router.navigate(['/']);
    return false;
  }

};