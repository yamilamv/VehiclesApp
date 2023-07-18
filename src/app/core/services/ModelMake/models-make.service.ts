import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResult } from '../../models/genericResult.interface';
import { ModelMakeModel } from '../../models/modelMake';
import { API_BASE_URL } from 'src/app/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelsMakeService {

  private apiUrl = API_BASE_URL;

  constructor(private httpClient: HttpClient) { }

  getModelsForMakeId(makeId:number, format:string = " 'XML' | 'CSV' | 'JSON' "): Observable<GenericResult<ModelMakeModel>> {
		const entity = 'vehicles/GetModelsForMakeId';
    let params = new HttpParams();
    params = params.set('format', format);
    return this.httpClient.get<GenericResult<ModelMakeModel>>(
			`${this.apiUrl}${entity}/${makeId}`,
			{params}
		);
	}

}
