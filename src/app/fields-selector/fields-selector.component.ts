import { Component, OnInit } from '@angular/core';
import {VehicleReportService} from '../services/vehicle-report.service';
import {SelectItemBean} from '../../../projects/prompt-selector/src/lib/select-item-bean';

@Component({
  selector: 'app-fields-selector',
  templateUrl: './fields-selector.component.html',
  styleUrls: ['./fields-selector.component.css']
})
export class FieldsSelectorComponent implements OnInit {
  fields;
  fieldsLists:SelectItemBean[];
  loading:boolean;
  constructor(public vehicleReportService:VehicleReportService) { }

  ngOnInit() {
    this.loading = true;
    this.vehicleReportService.getFields().subscribe(resp=>{
      this.loading = false;
      this.fields = resp;
      this.fieldsLists = this.fields.map((item)=>{ return <SelectItemBean>{id:item.id, text:item.description, value:item.fieldName } });
      console.log(resp);
    })
  }

}
