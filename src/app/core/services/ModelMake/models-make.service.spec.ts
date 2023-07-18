import { HttpClient, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GenericResult } from '../../models/genericResult.interface';
import { ModelMakeModel } from '../../models/modelMake';
import { ModelsMakeService } from './models-make.service';

describe('ModelsMakeService', () => {
  let service: ModelsMakeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ModelsMakeService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });

    service = TestBed.inject(ModelsMakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API with correct parameters', () => {
    const format = 'JSON';
    const makeId = 123;
    const expectedUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${makeId}`;

    httpClientSpy.get.and.returnValue(of({})); // Simulate empty response

    service.getModelsForMakeId(makeId, format).subscribe();

    expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl, { params: new HttpParams().set('format', format) });
  });

  it('should return the expected result from the API', () => {
    const format = 'JSON';
    const makeId = 123;
    const expectedResponse: GenericResult<ModelMakeModel> = {
      Count: 2,
      Results: [{ Make_ID: 1, Make_Name: 'Make 1', Model_ID:1, Model_Name: 'Model 1' }, { Make_ID: 2, Make_Name: 'Make 2', Model_ID:2, Model_Name: 'Model 2' }],
      Message: "Prueba",
      SearchCriteria: "Prueba Search"
    };

    httpClientSpy.get.and.returnValue(of(expectedResponse));

    service.getModelsForMakeId(makeId, format).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });
  });
});


