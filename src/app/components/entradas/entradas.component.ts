import {Component, OnInit } from '@angular/core';
import {DialogService} from "ng2-bootstrap-modal";
//Services
import {EntradaService} from '../../services/entrada.service';
import {OperarioService} from '../../services/operario.service';
import {TareaService} from '../../services/tarea.service';
//Models
import {Entrada} from '../../model/entrada';
import {Tarea} from '../../model/tarea';
import {Operario} from '../../model/operario';
import {DetalleTarea} from '../../model/detalle-tarea';
//Components
import {DetalleTareaComponent} from '../../components/entradas/dialog/detalle-tarea/detalle-tarea.component';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styles: []
})

export class EntradaComponent implements OnInit {
  public listaEntradas:Array<Entrada>;
  public filtro:Entrada=new Entrada();
  public listaOperarios:Array<any>;
  public operario:Operario;
  public tarea:Tarea;
  public detalleTarea:Array<DetalleTarea>;
  constructor(private _entradaService:EntradaService,private _operarioService:OperarioService,private _tareaService:TareaService,private _dialogService:DialogService) {
    this.detalleTarea=new Array<DetalleTarea>();
    this._entradaService.listar().subscribe(data=>this.listaEntradas=data);
    this._operarioService.listar().subscribe(data=>this.listaOperarios=data);
  }
  ngOnInit() {}
  public agregarALista(item:DetalleTarea,control:any){
    control.disabled=true;
    this.detalleTarea.push(item);
  }
  public mostrarTareas(){
    let disposable = this._dialogService.addDialog(DetalleTareaComponent,{
      title: 'Detalle de Entrada de Producto',
      message: 'Información',
      detalle: this.detalleTarea,
      operario:this.operario}).subscribe((isConfirmed)=>{
        if(isConfirmed){
          //alert('aceptado');
        }else{
          //alert('declined');
        }
    });
  }
}
