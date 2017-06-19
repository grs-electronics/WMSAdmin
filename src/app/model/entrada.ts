import {TipoDocumento} from './tipo-documento';
export class Entrada extends TipoDocumento{
  DocNum:string;
  Fecha_Doc:string;
  Proveedor:string;
  CardName: string;
  Articulo: string;
  ItemName:string;
  Cantidad: string;
  Contenedor:string;
  ETA: string;
  NumFactura: string;
  Comentarios: string;
  constructor(){
    super('Entrada');
  }
}
