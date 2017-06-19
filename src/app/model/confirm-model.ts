import {Operario} from "./operario";
import {DetalleTarea} from './detalle-tarea';
/**
 * Created by retana on 25/05/2017.
 */
export interface ConfirmModel {
  title?:string;
  message?:string;
  entrega?:{};
  entregaLineas?:{};
  operario?:Operario;
  tarea?:any;
  detalle?:any;
}
