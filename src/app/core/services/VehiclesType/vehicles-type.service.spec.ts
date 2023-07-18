import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GenericResult } from '../../models/genericResult.interface';
import { VehicleTypeModel } from '../../models/vehicleType.interface';
import { VehiclesTypeService } from './vehicles-type.service';

describe('VehiclesTypeService', () => {
  let service: VehiclesTypeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        VehiclesTypeService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });

    service = TestBed.inject(VehiclesTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API with correct parameters', () => {
    const format = 'JSON';
    const makeId = 123;
    const expectedUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}`;

    httpClientSpy.get.and.returnValue(of({})); // Simulate empty response

    service.getVehicleTypesForMakeId(makeId, format).subscribe();

    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl, { params: new HttpParams().set('format', format) });
  });

  it('should return the expected result from the API', () => {
    const format = 'JSON';
    const makeId = 123;
    const expectedResponse: GenericResult<VehicleTypeModel> = {
      Count: 2,
      Results: [{ VehicleTypeId: 1, VehicleTypeName: 'Vehicle Type 1' }, { VehicleTypeId: 2, VehicleTypeName: 'Vehicle Type 2' }],
      Message: "Test",
      SearchCriteria: "Vehicle Type 1"
    };

    httpClientSpy.get.and.returnValue(of(expectedResponse));

    service.getVehicleTypesForMakeId(makeId, format).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
  });
});
