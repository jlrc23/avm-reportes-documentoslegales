import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { HomeDataSource } from './home-datasource';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: HomeDataSource;
  displayedColumns = ['id', 'year', 'economic_number','serial_number', 'plates', 'status',    'document_type',    'document_number',    'amount',    'created',   'issued',    'owner'];
  ngOnInit() {
    this.dataSource = new HomeDataSource(this.paginator, this.sort);
    this.httpClient.get(environment.api + 'vehiclereport/getReportAjax').subscribe((resp: any) => {
      console.log(`Recived Response:`);
      this.dataSource.setVehicles(JSON.parse(resp));
    });
  }


  constructor(public httpClient: HttpClient) { }
}
