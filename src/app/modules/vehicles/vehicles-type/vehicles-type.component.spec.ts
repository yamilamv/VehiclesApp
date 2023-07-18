import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectListVehiclesType, selectVehiclesTypeLoading } from 'src/app/state/vehiclesType/vehiclesType.selectors';
import { VehiclesTypeComponent } from './vehicles-type.component';
import { MatListModule } from '@angular/material/list';
import { AppState } from 'src/app/state/app.state';

describe('VehiclesTypeComponent', () => {
  let component: VehiclesTypeComponent;
  let fixture: ComponentFixture<VehiclesTypeComponent>;
  let storeMock: Partial<Store<AppState>>;

  beforeEach(() => {
    storeMock = {
      select: (selector: any): Observable<any> => {
        if (selector === selectListVehiclesType) {
          return of([{ VehicleTypeId: 1, VehicleTypeName: 'Vehicle Type 1' }, { VehicleTypeId: 2, VehicleTypeName: 'Vehicle Type 2' }]);
        } else if (selector === selectVehiclesTypeLoading) {
          return of(false);
        }

        return of(null);
      }
    };

    TestBed.configureTestingModule({
      declarations: [VehiclesTypeComponent],
      providers: [{ provide: Store, useValue: storeMock }],
      imports: [MatListModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the VehiclesTypeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set vehiclesType$ ngOnInit', () => {
    spyOn(component['store'], 'select').and.returnValue(of([{ VehicleTypeId: 1, VehicleTypeName: 'car' }]));
    component.ngOnInit();
    component.vehiclesType$.subscribe(data => {
        expect(data).toEqual([{VehicleTypeId: 1, VehicleTypeName: 'car'}]);
    });

  });

  it('should set loading$ ngOnInit', () => {
    spyOn(component['store'], 'select').and.returnValue(of(true));
    component.ngOnInit();
    component.loading$.subscribe(data => {
      expect(data).toBe(true);
    });
  });

});
