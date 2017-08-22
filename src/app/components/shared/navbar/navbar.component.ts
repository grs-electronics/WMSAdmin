import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  usuario:Object;
  constructor(private auth:AuthService,private _router:Router) {

  }
  ngOnInit() {
    if(this.auth.isAuthenticate){
      this._router.navigate(['/home']);
      if(window.localStorage.getItem('usuario')==null){
        window.location.reload();
      }
    }else{
      this._router.navigate(['/login']);
    }
  }

  userLogged(){
    let usuario=window.localStorage.getItem('usuario');
    return JSON.parse(usuario);
  }

}
