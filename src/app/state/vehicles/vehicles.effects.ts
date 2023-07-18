import { vehiclesActions } from './vehicles.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { GenericResult } from 'src/app/core/models/genericResult.interface';
import { MakeModel } from 'src/app/core/models/make.interface';
import { VehiclesService } from 'src/app/core/services/Vehicles/vehicles.service';

@Injectable()
export class MakesEffects {

  loadMakes$ = createEffect(() => this.actions$.pipe(
    ofType(vehiclesActions.loadMakes),
    mergeMap(() => this.vehiclesService.getAllMakes('JSON')
      .pipe(
        map((data: GenericResult<MakeModel>) => {
          return vehiclesActions.loadedMakesSuccess({
            makes: data.Results
          });
        }),
        catchError((error:any) => {
          return of(
            vehiclesActions.loadedMakesFailure({ error })
          );
        })
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private vehiclesService: VehiclesService
  ) {}
}
