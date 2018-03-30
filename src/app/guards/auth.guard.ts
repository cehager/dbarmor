import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppRepositoryService } from '../services/apprepository.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private appsvc: AppRepositoryService, private router: Router, private alertify: AlertifyService) {}


  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('user token is: ', this.appsvc.userToken);
   if (!!this.appsvc.userToken) {
      return true;
   }

   this.alertify.error('You need to login before you can access this page.');
   this.router.navigate(['/home']);
   return false;
  }
}

