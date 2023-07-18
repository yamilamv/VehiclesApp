import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { MakeModel } from 'src/app/core/models/make.interface';
import { AppState } from 'src/app/state/app.state';
import { vehiclesActions } from 'src/app/state/vehicles/vehicles.actions';
import { selectListMakes, selectMakes, selectMakesLoading } from 'src/app/state/vehicles/vehicles.selectors';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {
  makes$: Observable<readonly MakeModel[]> = new Observable();
  loading$: Observable<boolean> = new Observable();
  filterValue:string = "";

  container_padding =  178;
  screenHeight:number = 0;

  constructor(
    private store: Store<AppState>,
    private router: Router){}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectMakesLoading);
    this.makes$ = this.store.select(selectListMakes);
    this.store.dispatch(vehiclesActions.loadMakes());
    this.screenHeight = window.innerHeight;
  }

  filterMakes(): void {
    const filteredMakes$ = this.makes$.pipe(
      map(makes => makes.filter(make => make.Make_Name.toLowerCase().includes(this.filterValue.toLowerCase())))
    );
    this.makes$ = filteredMakes$;
  }

  calculateContainerHeight(): number {
    return this.screenHeight - this.container_padding;
  }

  loadMore(make:MakeModel): void {
    this.router.navigate(['/vehicle/details/', make.Make_ID]);
    this.store.dispatch(vehiclesActions.selectMake({ make: make }));
    localStorage.setItem('selectedMake', JSON.stringify(make));
  }

}
