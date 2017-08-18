import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ConfirmModel} from "../../../../model/confirm-model";
import {TareaService} from "../../../../services/tarea.service";
import {SolucionTarea} from "../../../../model/solucion-tarea";
import {Transporte} from '../../../../model/transporte';
import {TransporteService} from '../../../../services/transporte.service';
import {Tarea} from '../../../../model/tarea';

@Component({
  selector: 'app-tarea-modal',
  templateUrl: './tarea-modal.component.html',
  styles: []
})
export class TareaModalComponent extends DialogComponent<ConfirmModel,null> implements OnInit {
  private listaTransporte:Array<Transporte>;
  private listaPilotos:Array<Transporte>;
  public transporte:Transporte=new Transporte();
  public isCollapse:boolean=false;
  public prioridad:string='Media';
  public nombreTransporte:string="";
  public numGuia:string;
  public valorGuia:string;
  public totalKilometraje:number=0;
  constructor(
      dialogService:DialogService,
      public _tareaService:TareaService,private transService:TransporteService) {
        super(dialogService);

        this.transService.transportistas().subscribe(data=>{
        this.listaTransporte=data;
    });
  }

  ngOnInit() {
  }
  kilometrajeIn(km:number){
      this.totalKilometraje=this.totalKilometraje-Number(km);
  }
  kilometrajeOut(km:number){
      this.totalKilometraje=this.totalKilometraje+Number(km);
  }

  confirm(){
    for(let item of this._tareaService.listar()){
      item.transporte=this.transporte;
      item.numGuia=this.numGuia;
      item.valorGuia=this.valorGuia;
      item.solucionTarea=new Array<SolucionTarea>();
      this._tareaService.agregar(item).subscribe(data=> console.log(data));
      this._tareaService.limpiar();
    }
    this.close();
  }
  cancel(){
    this.close();
  }
  collapse(data){
    if(this.isCollapse){
      data.style.display='block';
    }else{
      data.style.display='none';
    }

  }

  obtenerPilotos(transporte:string){
    this.transService.pilotos(transporte).subscribe(pilotos=>{
      this.listaPilotos=pilotos;
    });
  }

  eliminarTarea(item:Tarea){
    this.totalKilometraje=Number(window.localStorage.getItem('km'))-Number(item.kilometraje);
    this._tareaService.eliminar(item);
  }

  seleccionarPiloto(piloto:string){
    for(let i in this.listaPilotos){
      if(this.listaPilotos[i].piloto===piloto){
        this.transporte=this.listaPilotos[i];
        this.transporte.nombre=piloto;
      }
    }
  }

}
