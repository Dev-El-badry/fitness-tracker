import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import {take} from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private auth: AuthService, private store:Store<fromRoot.State>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuthenticate).pipe(take(1))
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuthenticate).pipe(take(1))
  }
}
