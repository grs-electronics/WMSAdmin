import { Injectable } from '@angular/core';
import {Router,ActivatedRouteSnapshot,RouterStateSnapshot ,CanActivate} from '@angular/router';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(
    private _auth:AuthService,
    private _router:Router
  ) { }

  canActivate(){
    if(window.localStorage.getItem('access_token')===null){
      this._router.navigate(['login']);
      return false;
    }
      return true;
    
  }

}
