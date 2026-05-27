import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  try {
    const raw = localStorage.getItem('usuario');
    if (!raw) {
      router.navigate(['/']);
      return false;
    }

    const usuario = JSON.parse(raw);

    if (!usuario?.id || !usuario?.email || !usuario?.rol) {
      localStorage.removeItem('usuario'); 
      return false;
    }

    return true;

  } catch {
    localStorage.removeItem('usuario');
    router.navigate(['/']);
    return false;
  }

};