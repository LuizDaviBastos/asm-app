import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardLoggedService, AuthGuardLoggoutService } from './services';
import { ShowHidePasswordComponent } from './components/show-hide-password/show-hide-password.component';

const routes: Routes = [
 
  {
    canActivate: [AuthGuardLoggedService],
    path: 'message',
    loadChildren: () => import('./tab-message/tab-message.module').then(m => m.Tab1PageModule)
  },
  {
    canActivate: [AuthGuardLoggedService],
    path: 'settings',
    loadChildren: () => import('./tab-settings/tab-settings.module').then(m => m.Tab3PageModule)
  },
  {
    canActivate: [AuthGuardLoggoutService],
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: '',
    redirectTo:'/message',
    pathMatch: 'full'
}

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
