import { Component, OnInit } from '@angular/core';
import {TareaService} from "../../services/tarea.service";
import {Tarea} from "../../model/tarea";
import {DialogService} from 'ng2-bootstrap-modal';
import {DetalleTareaModalComponent} from './dialog/detalle-tarea/detalle-tarea.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {CsvService} from "angular2-json2csv";
declare var jsPDF: any;
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html'
})
export class TareaComponent implements OnInit {
  public listaTareas:Array<Tarea>;
  public filtro:Tarea=new Tarea();
  constructor(private _tareaService:TareaService,private _dialogService:DialogService,private _csvService: CsvService) {
    this._tareaService.listaServer().subscribe(data=>this.listaTareas=data);
  }

  ngOnInit() {
  }

  public eliminarTarea(tarea:Tarea){
    this._tareaService.eliminarServer(tarea).subscribe(data=>{
      console.log('dentro');
      this._tareaService.listaServer().subscribe(data=>this.listaTareas=data);
    });
  }
  public detalleTarea(tarea:Tarea){
    this._tareaService.details(tarea._id).subscribe(data=>{
      let disposable = this._dialogService.addDialog(DetalleTareaModalComponent,{
        tarea:data
        }).subscribe((isConfirmed)=>{
          if(isConfirmed){
          }else{
            //alert('aceptado');
            //alert('declined');
          }
      });
    })
  }
  private reporte:Array<any>;
  private data:{
    DocNum?:string,
    Producto?:string,
    FechaAsignacion?:string;
    Codigo?:string,
    Cliente?:string,
    Bodega?:string,
    Encargado?:string,
    Transporte?:string,
    DPI?:string,
    Placa?:string
  };
  public exportsData(){
    this.reporte=new Array<any>();
    this.data={};
    for(let i in this.listaTareas){
      if(this.listaTareas[i].estado==='Finalizada'){
        for(let index in this.listaTareas[i].solucionTarea){
            this.data=new Object();
            this.data.Cliente=this.listaTareas[i].documento.cardName;
            this.data.Producto=this.listaTareas[i].solucionTarea[index].articulo;
            this.data.Codigo=this.listaTareas[i].solucionTarea[index].numeroDeSerie;
            this.data.DocNum=this.listaTareas[i].documento.docNum;
            this.data.FechaAsignacion=this.listaTareas[i].fechaAsignacion;
            this.data.Encargado=this.listaTareas[i].operario.name;
            this.data.Transporte=this.listaTareas[i].transporte.nombre;
            this.data.DPI=this.listaTareas[i].transporte.dpi;
            this.data.Placa=this.listaTareas[i].transporte.placas;
            this.data.Bodega=this.listaTareas[i].solucionTarea[index].bodega;

            this.reporte.push(this.data);
        }
      }
    }
    new Angular2Csv(this.reporte,'Entregas'+new Date().toLocaleString(),{
        title:'Listado de Entregas',
        fieldSeparator: ';',
        quoteStrings: '\t',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false
      });
      //this._csvService.download(this.reporte, 'Entregas');
  }
  public exportPDF(){
    this.reporte=new Array<any>();
    this.data={};
    for(let i in this.listaTareas){
      if(this.listaTareas[i].estado==='Finalizada'){
        for(let index in this.listaTareas[i].solucionTarea){
            this.data=new Object();
            this.data.Cliente=this.listaTareas[i].documento.cardName;
            this.data.Producto=this.listaTareas[i].solucionTarea[index].articulo;
            this.data.Codigo=this.listaTareas[i].solucionTarea[index].numeroDeSerie;
            this.data.DocNum=this.listaTareas[i].documento.docNum;
            this.data.FechaAsignacion=this.listaTareas[i].fechaAsignacion;
            this.data.Encargado=this.listaTareas[i].operario.name;
            this.data.Transporte=this.listaTareas[i].transporte.nombre;
            this.data.DPI=this.listaTareas[i].transporte.dpi;
            this.data.Placa=this.listaTareas[i].transporte.placas;
            this.data.Bodega=this.listaTareas[i].solucionTarea[index].bodega;

            this.reporte.push(this.data);
        }
      }
    }
    let col=[
      {title:"Cliente",dataKey:"cliente"},
      {title:"Producto",dataKey:"producto"},
      {title:"Código",dataKey:"codigo"},
      {title:"DocNum",dataKey:"docNum"},
      {title:"FechaAsignacion",dataKey:"fechaAsignacion"},
      {title:"Encargado",dataKey:"encargado"},
      {title:"DPI",dataKey:"dPI"},
      {title:"Transporte",dataKey:"transporte"},
      {title:"Placa",dataKey:"placa"},{title:"Bodega",dataKey:"bodega"}];
    let doc = new jsPDF('l', 'mm', [400, 210]);
    console.log(doc);
    doc.autoTable(col,this.reporte,{
      columnStyles: { comment: { columnWidth: 'auto' } },
      tableWidth: 'auto'
    });
    doc.save('Entregas'+new Date().toLocaleString());
  }
}
