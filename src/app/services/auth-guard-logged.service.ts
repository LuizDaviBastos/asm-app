import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../helpers/local-storage.helper';
import { MeliService } from 'src/services/meli-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedService implements CanActivate {
  constructor(private router: Router, private meliService: MeliService) { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(!LocalStorage.IsLogged){
      this.router.navigate(['/auth']);
      return false;
    }

    if(!LocalStorage.getLogin()?.hasMeliAccount) {
      return this.meliService.hasMeliAccount(LocalStorage.getLogin().data.id).pipe(
        map((hasMeliAccount) => {
          if (!hasMeliAccount) {
            //TODO SHOW MESSAGE FOR USER EXPLANING THAT HE NEED SYNC A MELI ACCOUNT
            this.meliService.addMeliAccount(LocalStorage.getCountry())
          } else {
            /*const login = LocalStorage.getLogin();
            this.meliService.login(login.data.email, login.data.password).subscribe((response) => {
              if(response.success) {
                LocalStorage.setLogin(response.data);
                this.router.navigate(['/message']);
              }
            })*/
            this.router.navigate(['/auth']);
          }
          return false;
        })
      );
    }
    return LocalStorage.IsLogged;
    return this.meliService.isAuthenticated(LocalStorage.token).pipe(
      map((isAuthenticated) => {
        if(isAuthenticated) {
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
