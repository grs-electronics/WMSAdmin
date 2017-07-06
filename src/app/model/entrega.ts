import {TipoDocumento} from "./tipo-documento";

export class Entrega extends TipoDocumento{
  asignado:string;
  bodega:string;
  docEntry:string;
  docNum:string;
  quantity:string;
  entregado:string;
  pendiente:string;
  cardName:string;
  fecha_Pedido:string;
  fecha_Compromiso:string;
  diasVencidos:string;
  comentarios:string;
  ruta:string;
  zona_Entrega:string;
  tramo_Directo:string;
  kM_Extra:string;
  direccion:string;

  constructor(){
    super('Entrega');
  }
}
