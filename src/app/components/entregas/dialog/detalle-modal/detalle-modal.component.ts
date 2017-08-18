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
    let asignable:boolean=false;
    this.tarea=new Tarea();
    this.tarea.documento=this.entrega;
    this.tarea.solucionTarea=new Array<SolucionTarea>();
    this.tarea.operario=this.operario;
    this.tarea.tipo='Entrega';
    if(this.editable){
      if(this._tareaService.listar().length>0){
        for(let detTarea of this.listaAsignacion){
          for(let miTarea of this._tareaService.listar()){
            if(this.tarea.documento.docNum==miTarea.documento.docNum){
              if(miTarea.detalleTarea){
                for(let detalle of miTarea.detalleTarea){
                  if(detTarea.articulo===detalle.articulo){
                    asignable=true;
                    console.log(detalle.cantidad,Number(detalle.asignado)+Number(detTarea.asignado))
                    if(Number(detalle.cantidad)>=Number(detalle.asignado)+Number(detTarea.asignado)){
                      console.log("Se puede asginar");
                      this.tarea.detalleTarea=this.listaAsignacion;
                      this._tareaService.agregarALista(this.tarea);
                    }else{
                      console.log("No se puede asignar valor no valido");
                    }
                  }
                }
              }
            }
          }
        }
      }
      if(asignable==false){
        this._tareaService.agregarALista(this.tarea);
      }
      if(this._tareaService.listar().length<=0){
        this.tarea.detalleTarea=this.listaAsignacion;
        this._tareaService.agregarALista(this.tarea);
      }

    }else{
      this.entregaLineas.subscribe(value=>{
        if(this._tareaService.listar().length>0){
          for(let detTarea of value){
            for(let miTarea of this._tareaService.listar()){
              console.log(this.tarea.documento.docNum+'='+miTarea.documento.docNum);
              if(this.tarea.documento.docNum==miTarea.documento.docNum){
                asignable=true;
                if(miTarea.detalleTarea){
                  for(let detalle of miTarea.detalleTarea){
                    if(detTarea.articulo===detalle.articulo){
                      console.log(detalle.cantidad,Number(detalle.asignado)+Number(detTarea.asignado))
                      if(Number(detalle.cantidad)>=Number(detalle.asignado)+Number(detTarea.asignado)){
                        console.log("Se puede asginar");
                        this.tarea.detalleTarea=value;
                        this._tareaService.agregarALista(this.tarea);
                      }else{
                        console.log("No se puede asignar valor no valido");
                      }
                    }
                  }
                }
              }
            }
          }
        }

        if(!asignable){
          this.tarea.detalleTarea=value;
          this._tareaService.agregarALista(this.tarea);
        }
      });
    }
    //console.log(this.tarea);


    this.close();
  }
  asignacionParcial(item){
    this.listaAsignacion.push(item);
  }


}
