import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransporteService } from '../../services/transporte.service';
import { Transporte } from '../../model/transporte';
@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styles: []
})
export class TransporteComponent implements OnInit {
  private listaTransporte:Array<Transporte>;
  private listaTransportista:Array<Object>;
  private transporte:Transporte=new Transporte();
  mostrarForm:boolean=false;
  mostrarForm2:boolean=false;
  constructor(private transService:TransporteService) {
    this.cargarListaTransporte();
    this.transService.transportistas().subscribe(data=>{
      this.listaTransportista=data;
    });
  }
  cargarListaTransporte(){
    this.transService.all().subscribe(data=>{
      this.listaTransporte=data;
    });
  }
  ngOnInit() {}
  guardarDatos(forma:NgForm){
      this.transService.save(forma.value).subscribe(data=>{
        this.cargarListaTransporte();
        this.mostrarForm=!this.mostrarForm;
        console.log(data);
      });
  }
  cargarEditar(transporte:Transporte){
    this.transporte=transporte;
  }
  editar(){
    this.transService.update(this.transporte).subscribe(data=>{
      this.cargarListaTransporte();
      console.log(data);
      this.mostrarForm2=!this.mostrarForm2;
      this.cargarListaTransporte();
    });
  }
  eliminar(transporte:Transporte){
    this.transService.delete(transporte).subscribe(data=>{
      this.cargarListaTransporte();
      console.log(data);
    });
  }
}
