import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { GenericResult } from 'src/app/core/models/genericResult.interface';
import { VehicleTypeModel } from 'src/app/core/models/vehicleType.interface';
import { VehiclesTypeService } from 'src/app/core/services/VehiclesType/vehicles-type.service';
import { vehiclesTypeActions } from './vehiclesType.actions';


@Injectable()
export class VehiclesTypeEffects {

  loadVehiclesType$ = createEffect(() => this.actions$.pipe(
    ofType(vehiclesTypeActions.loadVehiclesTypes),
    mergeMap(({makeId}) => this.vehiclesTypeService.getVehicleTypesForMakeId(makeId, 'JSON')
      .pipe(
        map((data: GenericResult<VehicleTypeModel>) => {
          return vehiclesTypeActions.loadedVehiclesTypesSuccess({
            vehiclesType: data.Results
          });
        }),
        catchError((error:any) => {
          return of(
            vehiclesTypeActions.loadedVehiclesTypesFailure({ error })
          );
        })
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private vehiclesTypeService: VehiclesTypeService
  ) {}
}
