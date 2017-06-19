import {TipoDocumento} from "./tipo-documento";

export class Entrega extends TipoDocumento{
  Asignado:string;
  Bodega:string;
  DocEntry:string;
  DocNum:string;
  Quantity:string;
  Entregado:string;
  Pendiente:string;
  CardName:string;
  Fecha_Pedido:string;
  Fecha_Compromiso:string;
  DiasVencidos:string;
  Comentarios:string;
  Ruta:string;
  Zona_Entrega:string;
  Tramo_Directo:string;
  KM_Extra:string;
  Direccion:string;

  constructor(){
    super('Entrega');
  }
}
