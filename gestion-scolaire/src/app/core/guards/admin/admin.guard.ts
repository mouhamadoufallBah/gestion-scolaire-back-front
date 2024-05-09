import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem('token')) {
    return true;
  }else{
    router.navigate(['/connexion'])
    return false;
  }
};
