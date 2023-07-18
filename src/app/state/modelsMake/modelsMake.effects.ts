import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { GenericResult } from 'src/app/core/models/genericResult.interface';
import { modelsMakeActions } from './modelsMake.actions';
import { ModelMakeModel } from 'src/app/core/models/modelMake';
import { ModelsMakeService } from 'src/app/core/services/ModelMake/models-make.service';

@Injectable()
export class ModelsMakeEffects {

  loadModelsMake$ = createEffect(() => this.actions$.pipe(
    ofType(modelsMakeActions.loadModelsMake),
    mergeMap(({makeId}) => this.modelsMakeService.getModelsForMakeId(makeId, 'JSON')
      .pipe(
        map((data: GenericResult<ModelMakeModel>) => {
          return modelsMakeActions.loadedModelsMakeSuccess({
            modelsMake: data.Results
          });
        }),
        catchError((error:any) => {
          return of(
            modelsMakeActions.loadedModelsMakeFailure({ error })
          );
        })
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private modelsMakeService: ModelsMakeService
  ) {}
}
