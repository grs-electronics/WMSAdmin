import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Router} from '@angular/router';


@Injectable()
export class AuthService {
  userInformation:{};
  isAuthenticated: boolean = false;
  constructor(private _http:Http,private _router:Router){}
  //Login
  login(usercreds){
    let headers = new Headers();
    let creds = `grant_type=password&username=${usercreds.username}&password=${usercreds.password}&scope=offline_access`;

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization','Basic Y2xpZW50X3h4OnNlY3JldF95eQ==');

    return new Promise((resolve) => {
        this._http.post('/oauth/token', creds, {headers:
        headers}).subscribe((data) => {
            if(data) {

                window.localStorage.setItem('access_token',
                  data.json().access_token);
                window.localStorage.setItem('expires_in',
                  data.json().expires_in);
                window.localStorage.setItem('refresh_token',
                  data.json().refresh_token);
                window.localStorage.setItem('token_type',
                  data.json().token_type);
                  this.userInfo()
                this.isAuthenticated=true;
              }
                resolve(this.isAuthenticated);
            }
        )
    });
  }
  logout(){
    //redirectTo
    this._router.navigate(['login']);
    window.localStorage.removeItem( 'access_token');
    this.isAuthenticated=false;
  }

  userLogged(){
    let usuario=window.localStorage.getItem('usuario');
    return JSON.parse(usuario);
  }

  isAuthenticate(){
    if(window.localStorage.getItem('access_token')===null){
       return false;
    }else{
      return true;
    }
  }

  userInfo(){
    let headers = new Headers();
    headers.append('Authorization','Bearer '+window.localStorage.getItem('access_token'));
    this._http.get('/api/userinfo',{headers:headers}).subscribe((data)=>{
      if(data){
        this.userInformation=data.json();
        window.localStorage.setItem('usuario',JSON.stringify(data.json()));
      }
    });
    return this.userInformation;
  }

}
