import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  constructor(private auth:AuthService,private _router:Router) { }
  ngOnInit() {
    if(this.auth.isAuthenticate){
      this._router.navigate(['/home']);
    }else{
      this._router.navigate(['/login']);
    }
  }

}
