import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../helpers/local-storage.helper';
import { AlertService } from 'src/services/alert-service';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/services/account-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggoutService implements CanActivate {
  constructor(private router: Router, private alertService: AlertService,
    private accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (LocalStorage.IsLogged && LocalStorage.getLogin().hasMeliAccount) {
      this.router.navigate(['/message']);
      return false;
    }
    else {
      return true;
    }
  }
}
