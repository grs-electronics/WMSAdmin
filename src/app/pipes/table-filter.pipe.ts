import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'TableFilter',
  pure: false
})
export class TableFilterPipe implements PipeTransform {
  private temp:Array<any>;
  transform(items: Array<any>, filter: string): Array<any>{
    if(!items || !filter){
      return items;
    }
    return items.filter((item)=> this.applyFilter(item,filter));
  }
  applyFilter(item:any, filter: any): boolean {
    for(let field in filter){
      if(filter.nombre==='Entrega'){
        if(filter[field] && filter[field]!=='Entrega'){
          if(typeof filter[field]=== 'string'){
            if(item[field].toLowerCase().indexOf(filter[field].toLowerCase())===-1){
              return false;
            }
          }else if(typeof filter[field]==='number'){
            if(item[field]!==  filter[field]){
              return false;
            }
          }
        }
      }//Fin Entrega
      if(filter.nombre="Entrada"){
        if(filter[field] && filter[field]!=='Entrada'){
          if(typeof filter[field]=== 'string'){
            if(item[field].toLowerCase().indexOf(filter[field].toLowerCase())===-1){
              return false;
            }
          }else if(typeof filter[field]==='number'){
            if(item[field]!==  filter[field]){
              return false;
            }
          }
        }
      }
    }
    return true;
  }


}
