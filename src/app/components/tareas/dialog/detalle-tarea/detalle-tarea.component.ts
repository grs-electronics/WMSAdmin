import { Component, OnInit } from '@angular/core';
import {ConfirmModel} from "../../../../model/confirm-model";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Tarea} from '../../../../model/tarea';
@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.component.html'
})
export class DetalleTareaModalComponent  extends DialogComponent<ConfirmModel,boolean> implements OnInit {
  public tarea:Tarea;
  constructor(dialogService:DialogService) {
    super(dialogService);
  }

  ngOnInit() {}
  confirm(){
    this.close();
  }
  cancel(){
    this.close();
  }
}
