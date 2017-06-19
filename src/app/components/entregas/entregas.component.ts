import { Component, OnInit,ViewChild,ViewEncapsulation  } from '@angular/core';
import {EntregaService} from '../../services/entrega.service';
import {OperarioService} from '../../services/operario.service';
import {DetalleModalComponent} from './dialog/detalle-modal/detalle-modal.component'
import {DialogService} from 'ng2-bootstrap-modal';
import {Entrega} from '../../model/entrega'
import {Tarea} from "../../model/tarea";
import {TareaService} from "../../services/tarea.service";
import {TareaModalComponent} from "./dialog/tarea-modal/tarea-modal.component";
import {Operario} from "../../model/operario";

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styles: []
})
export class EntregaComponent implements OnInit {
  public data:Array<any>;
  public listaOperarios:Array<any>;
  public operario:Operario;
  public filtro:Entrega=new Entrega();
  constructor(
               private _entregaService:EntregaService
              ,private _operarioService:OperarioService
              ,private _dialogService:DialogService
              ,private _tareaService:TareaService)
  {

    this._operarioService.listar().subscribe(items=> this.listaOperarios=items);
    this._entregaService.listar().subscribe(data=> this.data=data);
    this.operario=new Operario();
  }

  ngOnInit() {}

  public obtenerDetalle(entrega:Entrega){
    //tarea.documento=entrega;
    let disposable = this._dialogService.addDialog(DetalleModalComponent,{
      title: 'Detalle de Entrega',
      message: 'Información',
      entrega:entrega,
      operario:this.operario,
      entregaLineas:this._entregaService.detalleEntrega(entrega)}).subscribe((isConfirmed)=>{
        if(isConfirmed){
          //alert('aceptado');
        }else{
          //alert('declined');
        }
    });
  }

  public listaTareas(){
    let disposable = this._dialogService.addDialog(TareaModalComponent).subscribe((isConfirmed)=>{
      if(isConfirmed){
        //alert('aceptado');
      }else{
        //alert('declined');
      }
    });
  }
}
