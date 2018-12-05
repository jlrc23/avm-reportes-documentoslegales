import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {VehicleInterface} from '../interfaces/vehicle.interface';

@Injectable()
export class VehicleReportService {

  constructor(public  httpClient: HttpClient) { }


  getReport():Observable<VehicleInterface[]>{
    const endPoint = environment.api + 'vehiclereport/getReportAjax';
    console.log(`Request to EndPoint:`, endPoint);
    return this.httpClient.get<VehicleInterface[]>(endPoint);
  }

}
