import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ConfirmModel} from "../../../../model/confirm-model";
import {TareaService} from "../../../../services/tarea.service";
import {SolucionTarea} from "../../../../model/solucion-tarea";
import {Transporte} from '../../../../model/transporte';
@Component({
  selector: 'app-tarea-modal',
  templateUrl: './tarea-modal.component.html',
  styles: []
})
export class TareaModalComponent extends DialogComponent<ConfirmModel,null> implements OnInit {
  public transporte:Transporte=new Transporte();
  public isCollapse:boolean=false;
  public prioridad:string='Media';
  constructor(
      dialogService:DialogService,
      public _tareaService:TareaService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  confirm(){
    for(let item of this._tareaService.listar()){
      item.transporte=this.transporte;
      item.solucionTarea=new Array<SolucionTarea>();
      this._tareaService.agregar(item).subscribe(data=> console.log(data));
      this._tareaService.limpiar();
    }
    this.close();
  }
  cancel(){
    console.log('cancel');
    this.close();
  }
  collapse(data){
    if(this.isCollapse){
      data.style.display='block';
    }else{
      data.style.display='none';
    }

  }
}
