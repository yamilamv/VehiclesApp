import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VehicleTypeModel } from 'src/app/core/models/vehicleType.interface';
import { AppState } from 'src/app/state/app.state';
import { selectListVehiclesType, selectVehiclesTypeLoading } from 'src/app/state/vehiclesType/vehiclesType.selectors';

@Component({
  selector: 'app-vehicles-type',
  templateUrl: './vehicles-type.component.html',
  styleUrls: ['./vehicles-type.component.scss']
})

export class VehiclesTypeComponent implements OnInit {
  vehiclesType$:Observable<readonly VehicleTypeModel[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
      this.vehiclesType$ =  this.store.select(selectListVehiclesType);
      this.loading$ = this.store.select(selectVehiclesTypeLoading);
  }

}
