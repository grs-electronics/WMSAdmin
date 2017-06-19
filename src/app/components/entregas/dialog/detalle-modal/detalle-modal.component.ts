import { Component,ViewChild} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {EntregaService} from '../../../../services/entrega.service'
import {ConfirmModel} from '../../../../model/confirm-model'
import {Entrega} from "../../../../model/entrega";
import {Observable} from 'rxjs/Observable';
import {Tarea} from "../../../../model/tarea";
import {DetalleTarea} from "../../../../model/detalle-tarea";
import {TareaService} from "../../../../services/tarea.service";
import {Operario} from "../../../../model/operario";
import {SolucionTarea} from '../../../../model/solucion-tarea';

@Component({
  selector: 'app-detalle-modal',
  templateUrl: './detalle-modal.component.html',
  styles: []
})
export class DetalleModalComponent  extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel{
  title: string;
  message: string;
  entrega:Entrega;
  entregaLineas:Observable<Array<any>>;
  listaAsignacion:Array<DetalleTarea>;
  tarea:Tarea;
  detalleTarea:DetalleTarea;
  editable:boolean=false;
  operario:Operario;
  constructor(
      dialogService: DialogService,
      private _tareaService:TareaService) {
    super(dialogService);
    this.listaAsignacion=new Array<any>();
  }

  cambio(){
    this.editable=!this.editable;
  }

  confirm() {
    this.result = true;
    this.close();
  }
  prueba(){
    this.tarea=new Tarea();
    this.tarea.documento=this.entrega;
    this.tarea.solucionTarea=new Array<SolucionTarea>();
    this.tarea.operario=this.operario;
    this.tarea.tipo='Entrega';
    if(this.editable){
      this.tarea.detalleTarea=this.listaAsignacion;
    }else{
      this.entregaLineas.subscribe(value=>this.tarea.detalleTarea=value);
    }
    console.log(this.tarea);
    this._tareaService.agregarALista(this.tarea);
    this.close();
  }
  asignacionParcial(item){
    this.listaAsignacion.push(item);
  }
}
