import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const doctorGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  if (usuario.rol === 'doctor') {
    return true;
  }

  router.navigate(['/']);
  return false;
};