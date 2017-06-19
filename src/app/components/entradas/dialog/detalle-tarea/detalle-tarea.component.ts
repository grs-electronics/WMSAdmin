import { Component, OnInit } from '@angular/core';
import {ConfirmModel} from '../../../../model/confirm-model';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
//Models
import {Tarea} from '../../../../model/tarea';
import {DetalleTarea} from '../../../../model/detalle-tarea';
import {Operario} from '../../../../model/operario';
//services
import {TareaService} from '../../../../services/tarea.service';
@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.component.html',
  styles: []
})

export class DetalleTareaComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  public tarea:Tarea;
  public detalle:Array<DetalleTarea>;
  public operario:Operario;
  public prioridad:string='Media';
  public tiempo:string='30';
  constructor(dialogService: DialogService,private _tareaService:TareaService) {
    super(dialogService);
  }

  ngOnInit() {
  }
  cancel(){
    this.close();
  }

  confirm() {
    this.tarea=new Tarea();
    this.tarea.detalleTarea=this.detalle;
    this.tarea.prioridad=this.prioridad;
    this.tarea.duracion=this.tiempo;
    this.tarea.operario=this.operario;
    this.tarea.tipo='Entrada';
    this._tareaService.agregar(this.tarea).subscribe(data=>console.log(data));
    this.close();
  }

  eliminarTrabajo(item){
    this.detalle.splice(this.detalle.indexOf(item),1);
  }
}
