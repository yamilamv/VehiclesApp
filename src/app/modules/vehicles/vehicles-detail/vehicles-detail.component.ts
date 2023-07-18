import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MakeModel } from 'src/app/core/models/make.interface';
import { AppState } from 'src/app/state/app.state';
import { modelsMakeActions } from 'src/app/state/modelsMake/modelsMake.actions';
import { vehiclesActions } from 'src/app/state/vehicles/vehicles.actions';
import { selectedMake } from 'src/app/state/vehicles/vehicles.selectors';
import { vehiclesTypeActions } from 'src/app/state/vehiclesType/vehiclesType.actions';

@Component({
  selector: 'app-vehicles-detail',
  templateUrl: './vehicles-detail.component.html',
  styleUrls: ['./vehicles-detail.component.scss']
})
export class VehiclesDetailComponent implements OnInit, OnDestroy {
  makeId: number = 0;
  make: MakeModel = { Make_ID: 0, Make_Name: ""}; //crear helper
  filterValue: string = "";

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.makeId = params['makeId'];
      this.store.dispatch(vehiclesTypeActions.loadVehiclesTypes({ makeId: this.makeId }));
      this.store.dispatch(modelsMakeActions.loadModelsMake({ makeId: this.makeId }));
    }));

    const storedMake = localStorage.getItem('selectedMake');
    if (storedMake) {
      this.store.dispatch(vehiclesActions.selectMake({ make: JSON.parse(storedMake)}));
      const subscribeMake = this.store.select(selectedMake).subscribe((value: MakeModel) => {
          this.make = value;
      });
      this.subscriptions.push(subscribeMake);
    }

  }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedMake');
    this.subscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

}


