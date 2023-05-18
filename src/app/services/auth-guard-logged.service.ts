import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../helpers/local-storage.helper';
import { MeliService } from 'src/services/meli-service';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/services/alert-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedService implements CanActivate {
  constructor(private router: Router, private meliService: MeliService, private alertService: AlertService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!LocalStorage.IsLogged) {
      this.router.navigate(['/auth']);
      return false;
    }
    else {
      if (!LocalStorage.meliInfoStored() && !!LocalStorage.getLogin()?.hasMeliAccount) {
        this.meliService.getMeliAccountInfo(LocalStorage.getSelectedMeliAccount().id).subscribe((response) => {
          if (response.success) {
            LocalStorage.selectMeliAccount(response.data);
          }
          else {
            this.alertService.showToastAlert(response.message);
          }
        }, (error) => {
          this.alertService.showToastAlert(error?.error?.message || 'Um erro ocorreu ao obter suas informações.');
        })
      }
    }

    if (!LocalStorage.getLogin()?.hasMeliAccount) {
      return this.meliService.hasMeliAccount(LocalStorage.getLogin().data.id).pipe(
        map((hasMeliAccount) => {
          if (!hasMeliAccount) {
            this.router.navigateByUrl('auth/signup?step=5')
          } else {
            this.router.navigate(['/auth']);
          }
          return false;
        })
      );
    }

    return LocalStorage.IsLogged;
    return this.meliService.isAuthenticated(LocalStorage.token).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        else {
          LocalStorage.setToken(null);
          this.router.navigate(['/auth']);
          return false;
        }

      })
    )
  }
}
