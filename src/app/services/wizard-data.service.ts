import { Injectable } from '@angular/core';
import {SelectItemBean} from '../../../projects/prompt-selector/src/lib/select-item-bean';
import {LocalStorage} from 'ngx-webstorage';
import {BehaviorSubject} from 'rxjs';
import {WizardDataInterface} from '../interfaces/wizard-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WizardDataService {
  @LocalStorage("fieldsSelecteds")
  public fieldsSelecteds: SelectItemBean[];
  @LocalStorage("typeFilter")
  public typeFilter: number;
  @LocalStorage("filters")
  public filters: any;

  public fieldsSubject: BehaviorSubject<SelectItemBean[]> = new BehaviorSubject<SelectItemBean[]>(this.fieldsSelecteds);
  public typeFilterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.typeFilter);
  public filtersSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.filters);

  getData():WizardDataInterface{
    return <WizardDataInterface>{
      fieldsSelecteds: this.fieldsSelecteds,
      typeFilter: this.typeFilter,
      filters: this.filters
    }
  }

  setFields(fieldsSelecteds:SelectItemBean[]){
    this.fieldsSelecteds = [...fieldsSelecteds];
    this.fieldsSubject.next(this.fieldsSelecteds);
  }

  setTypeFilter(typeFilter:number){
    this.typeFilter = typeFilter;
    this.typeFilterSubject.next(this.typeFilter);
  }

  setFilters(filters:any){
    this.filters = [...filters];
    this.filtersSubject.next(this.filters);
  }

}
