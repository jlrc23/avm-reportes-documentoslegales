import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {VehicleDataInterface} from '../interfaces/vehicle-data.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleReportDataService {
  dataBehaviorSubject: BehaviorSubject<VehicleDataInterface> = new BehaviorSubject<VehicleDataInterface>(null);
  constructor() { }

  setVehicles( vehicleDataInterface: VehicleDataInterface)  {
    console.log('load data', vehicleDataInterface);
    this.dataBehaviorSubject.next(vehicleDataInterface);
  }
}
