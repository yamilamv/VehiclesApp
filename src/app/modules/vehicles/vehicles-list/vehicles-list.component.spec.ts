import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { vehiclesActions } from 'src/app/state/vehicles/vehicles.actions';
import { VehiclesListComponent } from './vehicles-list.component';
import { selectListMakes, selectMakesLoading } from 'src/app/state/vehicles/vehicles.selectors';
import { Router } from '@angular/router';


describe('VehiclesListComponent', () => {
  let component: VehiclesListComponent;
  let fixture: ComponentFixture<VehiclesListComponent>;
  let storeMock: Partial<Store<AppState>>;

  const mockStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: (selector: any): Observable<any> => {
      if (selector === selectListMakes) {
        return of([
          { Make_ID: 1, Make_Name: 'Make 1' },
          { Make_ID: 2, Make_Name: 'Make 2' }
        ]);
      } else if (selector === selectMakesLoading) {
        return of(false);
      }

      return of(null);
    }
  };

  const mockMakes = [
    { Make_ID: 1, Make_Name: 'Make 1' },
    { Make_ID: 2, Make_Name: 'Make 2' }
  ];

  const mockSelectListMakes = () => of(mockMakes);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiclesListComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: Store, useValue: mockStore,
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesListComponent);
    component = fixture.componentInstance;
    storeMock = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load makes on initialization', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(vehiclesActions.loadMakes());
  });


    it('test loading observable', () => {
      component.ngOnInit();
      spyOn(component['store'], 'select').and.returnValue(of(true));
      component.ngOnInit();
      component.loading$.subscribe(data => {
        expect(data).toBe(true);
      });
  });

  it('test makes observable', () => {
    component.ngOnInit();
    spyOn(component['store'], 'select').and.returnValue(of([
      { Make_ID: 1, Make_Name: 'Make 1' },
      { Make_ID: 2, Make_Name: 'Make 2' }
    ]));
    component.ngOnInit();
    component.makes$.subscribe(data => {
      expect(data).toEqual([
        { Make_ID: 1, Make_Name: 'Make 1' },
        { Make_ID: 2, Make_Name: 'Make 2' }
      ]);
    });
  });

  it('test update makes$ when filterMakes is called', () => {
    component.makes$ = mockSelectListMakes() as Observable<any>;
    component.filterValue = 'make 1';
    component.filterMakes();
    component.makes$.subscribe(makes => {
      expect(makes.length).toBe(1);
      expect(makes[0].Make_Name).toBe('Make 1');
    });
  });

  it('test calculate container height correctly', () => {
    component.screenHeight = 800;
    const containerHeight = component.calculateContainerHeight();
    expect(containerHeight).toBe(622);
  });

  it('test load more', () => {
    const make = { Make_ID: 1, Make_Name: 'Test Make' };
    spyOn(component['router'], 'navigate');
    component.loadMore(make);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/vehicle/details/', make.Make_ID]);
    expect(component['store'].dispatch).toHaveBeenCalledWith(vehiclesActions.selectMake({ make: make }));
    expect(localStorage.getItem('selectedMake')).toEqual(JSON.stringify(make));
  });

});
