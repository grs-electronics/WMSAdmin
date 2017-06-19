import { Injectable } from '@angular/core';
import {Http,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OperarioService {
  constructor(private _http:Http) { }
  public listar(){
    console.log('trabajo iniciado');
    return this._http.get('/api/operario').map((res:Response)=>res.json());
  }
}
