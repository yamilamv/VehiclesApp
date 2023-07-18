import { createAction, props } from '@ngrx/store';
import { MakeModel } from 'src/app/core/models/make.interface';

export const loadMakes = createAction(
    '[Makes List] Load Makes'
);

export const loadedMakesSuccess = createAction(
  '[Makes List] Loaded Makes Success',
  props<{ makes: MakeModel[] }>()
);

export const loadedMakesFailure = createAction(
	'[Makes List] Load Makes Failure',
	props<{ error: any }>()
);

export const selectMake = createAction(
  '[Makes List] Select Make',
  props<{ make: MakeModel }>()
);


export const vehiclesActions = {
	loadMakes,
  loadedMakesSuccess,
  loadedMakesFailure,
  selectMake
};
