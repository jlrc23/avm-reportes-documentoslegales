import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableVehiclesDataSource } from './table-vehicles-datasource';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {SettingsColumnsService} from '../services/settings-columns.service';
import {FilterFormService} from '../services/filter-form.service';

@Component({
  selector: 'app-table-vehicles',
  templateUrl: './table-vehicles.component.html',
  styleUrls: ['./table-vehicles.component.css'],
  providers: [ FilterFormService]
})
export class TableVehiclesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableVehiclesDataSource;

  ngOnInit() {
    this.dataSource = new TableVehiclesDataSource(this.paginator, this.sort);
    this.filterFormService.setTable(this.dataSource);
    this.httpClient.get(environment.api + 'vehiclereport/getReportAjax').subscribe((resp: any) => {
      console.log(`Recived Response:`);
      const allData =JSON.parse(resp);
      this.dataSource.setVehicles(allData);
      this.filterFormService.setAllData(allData);
      this.filterFormService.filterAllData();
    });
  }

  constructor(
    public httpClient: HttpClient,
    public settingsColumnsService: SettingsColumnsService,
    public filterFormService: FilterFormService) { }
}
