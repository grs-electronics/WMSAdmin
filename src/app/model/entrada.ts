import {TipoDocumento} from './tipo-documento';
export class Entrada extends TipoDocumento{
  docNum:string;
  fecha_Doc:string;
  proveedor:string;
  cardName: string;
  articulo: string;
  itemName:string;
  cantidad: string;
  contenedor:string;
  eTA: string;
  numFactura: string;
  comentarios: string;
  bodega:string;
  constructor(){
    super('Entrada');
  }
}
