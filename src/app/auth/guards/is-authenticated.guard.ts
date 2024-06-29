import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject(Router)

  const status = authService.authStatus();

  if (status === AuthStatus.authenticated) return true;

  //como aun no sabemos si esta autenticado o no, no debemos moverlo de url, es decir, llamamos la redirección cuando sabemos que NO está autenticado
  if(status === AuthStatus.checking) return false

    // const url = state.url
  // localStorage.setItem('url', url)
  router.navigateByUrl('/auth/login')
  return false;
};
