import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   if (localStorage.getItem('userId')==null && localStorage.getItem('firstName')==null && localStorage.getItem('lastName')==null && localStorage.getItem('emailAddress')==null && localStorage.getItem('profilePicture')==null) {
      this._router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
