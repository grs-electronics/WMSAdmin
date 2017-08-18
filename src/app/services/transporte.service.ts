import { Injectable } from '@angular/core';
import {Http,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Transporte} from '../model/transporte';

@Injectable()
export class TransporteService {

  constructor(private http:Http) { }

  all(){
    return this.http.get('api/transporte').map(this.extractData).catch(this.handleErrorObservable);
  }

  save(transporte:Transporte){
    return this.http.post('api/transporte',transporte).map(this.extractData).catch(this.handleErrorObservable);
  }

  update(transporte:Transporte){
    return this.http.put('api/transporte',transporte).map(this.extractData).catch(this.handleErrorObservable);
  }

  delete(transporte:Transporte){
    return this.http.delete('api/transporte/'+transporte._id).map(this.extractData).catch(this.handleErrorObservable);
  }

  transportistas(){
    return this.http.get('api/transportistas').map(this.extractData).catch(this.handleErrorObservable);
  }
  pilotos(transporte:string){
    return this.http.get('api/piloto/'+transporte).map(this.extractData).catch(this.handleErrorObservable);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body|| {};
  }
  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
