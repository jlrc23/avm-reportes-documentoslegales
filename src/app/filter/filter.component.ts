import { Component, OnInit } from '@angular/core';
import {VehicleReportService} from '../services/vehicle-report.service';
import {FormControl} from '@angular/forms';
import {CatalogItemInterface} from '../interfaces/catalog-item.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers:[VehicleReportService]
})
export class FilterComponent implements OnInit {
  private documents:any;
  public documentsCatalog: CatalogItemInterface[];
  private typesDocuments:any;
  public typesDocumentsCatalog: CatalogItemInterface[];
  private owners:any;
  public  ownersCatalog:CatalogItemInterface[];

  documentsSelected = new FormControl();
  ownersSelected = new FormControl();
  typesDocumentsSelected = new FormControl();

  constructor(public vehicleReportService:VehicleReportService) { }

  ngOnInit() {
    this.vehicleReportService.getDocuments().subscribe(resp=>{
      this.documents = resp;
      this.documentsCatalog = [];
      console.log(`Documentos:`);
      for(let i in this.documents){
        console.log(`Llave ${i} value: `,this.documents[i]);
        this.documentsCatalog.push({id: i, description:this.documents[i]});
      }
    });
    this.vehicleReportService.getOwners().subscribe(resp=>{
      this.owners = resp;
      this.ownersCatalog = [];
      console.log(`Propietarios:`);
      for(let i in this.owners){
        console.log(`Llave ${i} value: `, this.owners[i]);
        this.ownersCatalog.push({id: i, description:this.owners[i]});
      }
    });
    this.vehicleReportService.getTipoDocumento().subscribe(resp=>{
      this.typesDocuments = resp;
      this.typesDocumentsCatalog = [];
      console.log(`Types documents:`);
      for(let i in this.typesDocuments){
        console.log(`Llave ${i} value: `,this.typesDocuments[i]);
        this.typesDocumentsCatalog.push({id: i, description:this.typesDocuments[i]});
      }
    });
  }

}
