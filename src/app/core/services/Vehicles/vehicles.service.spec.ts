import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GenericResult } from '../../models/genericResult.interface';
import { MakeModel } from '../../models/make.interface';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        VehiclesService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });

    service = TestBed.inject(VehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API with correct parameters', () => {
    const format = 'JSON';
    const expectedUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes`;

    httpClientSpy.get.and.returnValue(of({})); // Simulate empty response

    service.getAllMakes(format).subscribe();

    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl, { params: new HttpParams().set('format', format) });
  });

  it('should return the expected result from the API', () => {
    const format = 'JSON';
    const expectedResponse: GenericResult<MakeModel> = {
      Count: 2,
      Results: [{ Make_ID: 1, Make_Name: 'Make 1' }, { Make_ID: 2, Make_Name: 'Make 2' }],
      Message: "Prueba",
      SearchCriteria: "Prueba Search"
    };

    httpClientSpy.get.and.returnValue(of(expectedResponse));

    service.getAllMakes(format).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
  });
});
