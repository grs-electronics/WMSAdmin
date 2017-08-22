import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user ={
    username: '',
    password: ''
  };
  constructor(private _auth:AuthService,private _router:Router) { }
  ngOnInit() {
  }

  login(usercreds){
      this._auth.userInformation=this.user;
      let userLogin=this._auth.login(usercreds);
      userLogin.then((res)=>{
        if(res){
          this._router.navigate(['/home']);
        }
      });
  }

}
