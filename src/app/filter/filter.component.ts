import { Component, OnInit } from '@angular/core';
import {VehicleReportService} from '../services/vehicle-report.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CatalogItemInterface} from '../interfaces/catalog-item.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers:[VehicleReportService]
})
export class FilterComponent implements OnInit {
  public documentsCatalog: CatalogItemInterface[] = [];
  public typesDocumentsCatalog: CatalogItemInterface[] = [];
  public ownersCatalog:CatalogItemInterface[] = [];
  public frmFilter: FormGroup;
  public fields: any;

  constructor(public vehicleReportService:VehicleReportService) {
    this.frmFilter = new FormGroup({
      documents: new FormControl(),
      typesDocument: new FormControl(),
      owners: new FormControl()
    });
  }

  ngOnInit() {
    this.vehicleReportService.getDocuments().subscribe(resp=>{
      for(let i in resp){
        const id: number = Number(i);
        this.documentsCatalog.push({id, description:resp[i]});
      }
    });
    this.vehicleReportService.getOwners().subscribe(resp=>{
      for(let i in resp){
        const id: number = Number(i);
        this.ownersCatalog.push({id, description:resp[i]});
      }
    });
    this.vehicleReportService.getTipoDocumento().subscribe(resp=>{
      for(let i in resp){
        const id: number = Number(i);
        this.typesDocumentsCatalog.push({id, description:resp[i]});
      }
    });
    this.vehicleReportService.getFields().subscribe(resp=>{
      this.fields = resp;
    })
  }

  sendForm(frmFilterValues){
    console.log(`Data:`, frmFilterValues);
    this.vehicleReportService.postReport(frmFilterValues).subscribe(resp=>{
      console.log("response filter:", resp);
      const allData = JSON.parse(<any>resp);
      console.log("render data", allData);
    });
  }

}
