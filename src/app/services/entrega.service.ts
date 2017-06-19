import { Injectable } from '@angular/core';
import {Http,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Entrega} from '../model/entrega';

@Injectable()
export class EntregaService {
  constructor(private _http:Http) {
  }
  listar(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer '+window.localStorage.getItem('access_token'));
    return this._http.get('/api/entrega').map((res:Response)=>res.json());
  }
  detalleEntrega(entrega:Entrega){
    return this._http.get('/api/entregadetalle?DocEntry='+entrega.DocNum).map((res:Response)=>res.json());
  }
}
