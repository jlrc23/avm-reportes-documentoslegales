import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableVehiclesDataSource } from './table-vehicles-datasource';
import {SettingsColumnsService} from '../../services/settings-columns.service';
import {FilterFormService} from '../../services/filter-form.service';
import {VehicleReportService} from '../../services/vehicle-report.service';
import {VehicleReportDataService} from '../../services/vehicle-report-data.service';

@Component({
  selector: 'app-table-vehicles',
  templateUrl: './table-vehicles.component.html',
  styleUrls: ['./table-vehicles.component.css'],
  providers: [VehicleReportService]
})
export class TableVehiclesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: TableVehiclesDataSource;

  ngOnInit() {
    this.dataSource = new TableVehiclesDataSource(this.paginator, this.sort, this.vehicleReportDataService);
    this.filterFormService.setTable(this.dataSource);
    /*this.vehicleReportService.getReport().subscribe((resp: any) => {
      console.log(`Recived typeResponse: ${typeof resp} Response:`, resp);
      const allData:VehicleDataInterface = <VehicleDataInterface>{ data:  JSON.parse(resp), action: ActionsEnum.init};
      this.vehicleReportDataService.setVehicles(allData);
      this.filterFormService.setAllData(allData.data);
      this.filterFormService.filterAllData();
    });*/
  }

  constructor(
    public vehicleReportService: VehicleReportService,
    public settingsColumnsService: SettingsColumnsService,
    public filterFormService: FilterFormService,
    public vehicleReportDataService: VehicleReportDataService) { }
}
