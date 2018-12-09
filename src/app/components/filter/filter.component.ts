import { Component, OnInit } from '@angular/core';
import {VehicleReportService} from '../../services/vehicle-report.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CatalogItemInterface} from '../../interfaces/catalog-item.interface';
import {WizardDataService} from '../../services/wizard-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public documentsCatalog: CatalogItemInterface[] = [];
  public typesDocumentsCatalog: CatalogItemInterface[] = [];
  public ownersCatalog: CatalogItemInterface[] = [];
  public frmFilter: FormGroup;
  public typeFilter:FormControl;

  constructor(
    public vehicleReportService: VehicleReportService,
    public wizardDataService: WizardDataService

  ) {
    this.typeFilter = new FormControl();
    this.frmFilter = new FormGroup({
      documents: new FormControl(),
      typesDocument: new FormControl(),
      owners: new FormControl()
    });
  }

  ngOnInit() {
    this.vehicleReportService.getDocuments().subscribe(resp => {
        for (const i in resp) {
          if (resp.hasOwnProperty(i)) {
            const id: number = Number(i);
            this.documentsCatalog.push({id, description: resp[i]});
          }
        }

    });
    this.vehicleReportService.getOwners().subscribe(resp => {
      for (const i in resp) {
        if (resp.hasOwnProperty(i)) {
          const id: number = Number(i);
          this.ownersCatalog.push({id, description: resp[i]});
        }
      }
    });
    this.vehicleReportService.getTipoDocumento().subscribe(resp => {
      for (const i in resp) {
        if (resp.hasOwnProperty(i)) {
          const id: number = Number(i);
          this.typesDocumentsCatalog.push({id, description: resp[i]});
        }
      }
    });

    this.typeFilter.valueChanges.subscribe(value=>{
      this.wizardDataService.typeFilter = value;
      console.log(`[RegistrationComponent/ngOnInit/typeFilter]`, value);
    });

    this.frmFilter.valueChanges.subscribe(value => {
      this.wizardDataService.filters = value;
      console.log(`[RegistrationComponent/ngOnInit/registrationForm::valuesChanges] Value: `, value);
    });
  }


}
