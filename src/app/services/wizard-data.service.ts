import { Injectable } from '@angular/core';
import {FieldInterface} from '../interfaces/field.interface';

@Injectable({
  providedIn: 'root'
})
export class WizardDataService {
  fieldsSelecteds: FieldInterface[];
  filters: any;

}
