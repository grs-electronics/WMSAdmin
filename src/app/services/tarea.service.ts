import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http'
import {Tarea} from "../model/tarea";
import {Observable} from "rxjs";

@Injectable()
export class TareaService {
  private listaTareas:Array<Tarea>;
  public longitud:number;
  constructor(private _http:Http) {
    this.listaTareas=new Array<Tarea>();
    this.longitud=this.listaTareas.length;
  }
  public agregarALista(tarea:Tarea){
    this.listaTareas.push(tarea);
  }
  public listar(){
    return this.listaTareas;
  }

  eliminar(tarea:Tarea){
    this.listaTareas.splice(this.listaTareas.indexOf(tarea),1);
  }
  limpiar(){
    this.listaTareas=new Array<Tarea>();
  }

  public agregar(tarea:Tarea){
    let headers= new Headers({ 'Content-Type': 'application/json' });
    let options= new RequestOptions({headers:headers});
    return this._http.post('/api/tarea',tarea,options).map(this.extractData).catch(this.handleErrorObservable);
  }
  public listaServer(){
    return this._http.get('api/tarea').map(this.extractData).catch(this.handleErrorObservable);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body|| {};
  }
  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  public eliminarServer(tarea:Tarea){
    this.eliminar(tarea);
    return this._http.delete('api/tarea/'+tarea._id).map(this.extractData).catch(this.handleErrorObservable);
  }
  public details(_id:string){
    return this._http.get('api/tarea/'+_id).map(this.extractData).catch(this.handleErrorObservable);
  }
}
