import {FormControl} from '@angular/forms';
import {TableVehiclesDataSource} from '../table-vehicles/table-vehicles-datasource';
import {SettingsColumnsService} from './settings-columns.service';
import {Injectable} from '@angular/core';

@Injectable()
export class FilterFormService {
  fieldsFilter:Object = {};
  fieldsFilterName = SettingsColumnsService.ALL_COLUMNS;
  readonly loggerNamespaceClass = 'Tools::FilterFormMonitor';
  public  dataSource: TableVehiclesDataSource;
  public allData;

  constructor() {
    this.fieldsFilterName.forEach(field=>{
      this.fieldsFilter[`${field}Filter`] = new FormControl();
      this.fieldsFilter[`${field}Filter`].valueChanges.subscribe(this.filterDataSubscribe(field));
    });
  }

  getFilter(field):FormControl{
    let result: FormControl;
    try{
      if(this.fieldsFilter[`${field}Filter`]){
        result = this.fieldsFilter[`${field}Filter`];
      }
    }catch (e) {
      console.error(`[${this.loggerNamespaceClass}/getFilter ] getFilter:`, e);
    }
    return result;
  }

  filterDataSubscribe(field){
    return (resp)=>{
      console.log(`[${this.loggerNamespaceClass}/valueChanges] field ${field}:`, resp);
      this.filterAllData();
    };
  }

  filterAllData(){
    if(!Array.isArray(this.allData))
      return ;
    let allData = [...this.allData];
    let fieldsFilter:Array<string> = this.fieldsFilterName.filter(field=>{
      const txtField:FormControl = <FormControl>this.fieldsFilter[`${field}Filter`];
      if(txtField.value !== null){
        return true;
      }
      return false;
    });
    if(Array.isArray(fieldsFilter) && fieldsFilter.length>0){
      fieldsFilter.forEach(field=>{
        const txtField:FormControl = <FormControl>this.fieldsFilter[`${field}Filter`];
        let filterRegex:RegExp;
        try{
          filterRegex = new RegExp(`${txtField.value}`, 'i');
        }catch (e) {
          console.error(`[${this.loggerNamespaceClass}/filterAllData] catch filterRegex`, e );
        }
        if(filterRegex){
          allData = allData.filter(data=>{
            let fieldValue:string = `${data[field]}`;
            return filterRegex.test(fieldValue);
          });
        }
      });
    }
    this.dataSource.setVehicles(allData);
  }

  setTable( table){
    this.dataSource = table;
  }

  setAllData(data:any[]){
    this.allData = [...data];
  }
}
