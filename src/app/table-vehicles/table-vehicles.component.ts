import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableVehiclesDataSource } from './table-vehicles-datasource';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-table-vehicles',
  templateUrl: './table-vehicles.component.html',
  styleUrls: ['./table-vehicles.component.css'],
})
export class TableVehiclesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableVehiclesDataSource;
  displayedColumns = ['id', 'year', 'economic_number', 'serial_number', 'plates', 'status',    'document_type',    'document_number',    'amount',    'created',   'issued',    'owner'];
  ngOnInit() {
    this.dataSource = new TableVehiclesDataSource(this.paginator, this.sort);
    this.httpClient.get(environment.api + 'vehiclereport/getReportAjax').subscribe((resp: any) => {
      console.log(`Recived Response:`);
      this.dataSource.setVehicles(JSON.parse(resp));
    });
  }


  constructor(public httpClient: HttpClient) { }
}
