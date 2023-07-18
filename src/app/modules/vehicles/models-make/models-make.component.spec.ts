import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectListModelsMake, selectModelsMakeLoading } from 'src/app/state/modelsMake/modelsMake.selectors';
import { ModelsMakeComponent } from './models-make.component';
import { MatListModule } from '@angular/material/list';

describe('ModelsMakeComponent', () => {
  let component: ModelsMakeComponent;
  let fixture: ComponentFixture<ModelsMakeComponent>;
  let storeMock: Partial<Store<AppState>>;

  beforeEach(() => {
    storeMock = {
      select: (selector: any): Observable<any> => {
        if (selector === selectListModelsMake) {
          return of([{ Model_ID: 1, Model_Name: 'Model 1' }, { Model_ID: 2, Model_Name: 'Model 2' }]);
        } else if (selector === selectModelsMakeLoading) {
          return of(false);
        }
        return of(null);
      }
    };

    TestBed.configureTestingModule({
      imports: [MatListModule],
      declarations: [ModelsMakeComponent],
      providers: [{ provide: Store, useValue: storeMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelsMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ModelsMakeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set modelsMake$ and loading$ on ngOnInit', () => {
    component.ngOnInit();
    spyOn(component['store'], 'select').and.returnValue(of([{ Model_ID: 1, Model_Name: 'Model 1' }, { Model_ID: 2, Model_Name: 'Model 2' }]));
    component.modelsMake$.subscribe((modelsMake:any) => {
      expect(modelsMake).toEqual([{ Model_ID: 1, Model_Name: 'Model 1' }, { Model_ID: 2, Model_Name: 'Model 2' }]);
    });

    component.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
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
