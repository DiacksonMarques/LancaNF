
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(routerActive: ActivatedRouteSnapshot, _: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (!this.userService.userIsLoged()) {
      localStorage.clear();
      return this.router.navigate(['/login']);
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardLogin implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  canActivate(routerActive: ActivatedRouteSnapshot, _: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userService.userIsLoged()) {
      return this.router.navigate(['/dashboard']);
    }

    return true;
  }
}
