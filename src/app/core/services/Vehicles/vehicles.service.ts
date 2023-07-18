import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResult } from '../../models/genericResult.interface';
import { MakeModel } from '../../models/make.interface';
import { API_BASE_URL } from 'src/app/enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private apiUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getAllMakes(format:string = " 'XML' | 'CSV' | 'JSON' "): Observable<GenericResult<MakeModel>> {
		const entity = 'vehicles/GetAllMakes';
    let params = new HttpParams();
    params = params.set('format', 'JSON');
    return this.httpClient.get<GenericResult<MakeModel>>(
			`${this.apiUrl}${entity}`,
			{params}
		);
	}


}
