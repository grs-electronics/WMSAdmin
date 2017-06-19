import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class EntradaService {

  constructor(private _http:Http) { }

  public listar(){
    return this._http.get('api/entrada')
      .map(this.extractData)
      .catch(this.handleErrorObservable);
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
