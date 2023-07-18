import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { MakeModel } from 'src/app/core/models/make.interface';
import { VehiclesDetailComponent } from './vehicles-detail.component';
import { vehiclesTypeActions } from 'src/app/state/vehiclesType/vehiclesType.actions';
import { modelsMakeActions } from 'src/app/state/modelsMake/modelsMake.actions';
import { selectedMake } from 'src/app/state/vehicles/vehicles.selectors';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VehiclesDetailComponent', () => {
  let component: VehiclesDetailComponent;
  let fixture: ComponentFixture<VehiclesDetailComponent>;
  let storeMock: Partial<Store<AppState>>;
  let activatedRouteMock: Partial<ActivatedRoute>;

  beforeEach(async () => {

    storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
      select: (selector: any) => {
        if (selector === selectedMake) {
          const make: MakeModel = { Make_ID: 1, Make_Name: 'Test Make' };
          return of(make);
        }
        return of();
      }
    };

    activatedRouteMock = {
      params: of({ makeId: 1 })
    };

    await TestBed.configureTestingModule({
      declarations: [VehiclesDetailComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test activatedRoute params subscription', () => {
    spyOn(component['subscriptions'], 'push');
    component.ngOnInit();
    expect(component['subscriptions'].push).toHaveBeenCalled();
  });

  it('test select make from store', () => {
    spyOn(component['store'], 'select').and.returnValue(of({ Make_ID: 1, Make_Name: 'Test Make' }));
    spyOn(JSON, 'parse').and.returnValue({ Make_ID: 1, Make_Name: 'Test Make' });
    spyOn(localStorage, 'getItem').and.returnValue('{"Make_ID":1,"Make_Name":"Test Make"}');
    component.ngOnInit();
    expect(component.make).toEqual({ Make_ID: 1, Make_Name: 'Test Make' });
  });

  it('should dispatch loadVehiclesTypes action', () => {
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      vehiclesTypeActions.loadVehiclesTypes({ makeId: 1 })
    );
  });

  it('should dispatch loadModelsMake action', () => {
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      modelsMakeActions.loadModelsMake({ makeId: 1 })
    );
  });

  it('should remove selectedMake from localStorage on ngOnDestroy', () => {
    spyOn(localStorage, 'removeItem');
    fixture.ngZone?.run(() => {
      component.ngOnDestroy();
    });
    expect(localStorage.removeItem).toHaveBeenCalledWith('selectedMake');
  });

  it('test unsubscribe all subscriptions', () => {
    spyOn(component['subscriptions'], 'forEach');
    fixture.ngZone?.run(() => {
      component.ngOnDestroy();
    });
    expect(component['subscriptions'].forEach).toHaveBeenCalled();
  });

});
