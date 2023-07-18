import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleTypeModel } from '../../models/vehicleType.interface';
import { GenericResult } from '../../models/genericResult.interface';
import { API_BASE_URL } from 'src/app/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesTypeService {
  private apiUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getVehicleTypesForMakeId(makeId:number, format:string = " 'XML' | 'CSV' | 'JSON'"): Observable<GenericResult<VehicleTypeModel>> {
		const entity = 'vehicles/GetVehicleTypesForMakeId';
    let params = new HttpParams();
    params = params.set('format', format);
    return this.httpClient.get<GenericResult<VehicleTypeModel>>(
			`${this.apiUrl}${entity}/${makeId}`,
			{params}
		);
	}


}
