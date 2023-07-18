import { createAction, props } from '@ngrx/store';
import { ModelMakeModel } from 'src/app/core/models/modelMake';

//Types Vehicles
export const loadModelsMake = createAction(
  '[Models Make] Load Models Make',
  props<{ makeId:number }>()
);

export const loadedModelsMakeSuccess = createAction(
'[Models Make] Loaded Models Make Success',
props<{ modelsMake: ModelMakeModel[] }>()
);

export const loadedModelsMakeFailure = createAction(
'[Models Make] Loaded Models Make Failure',
props<{ error: any }>()
);

export const modelsMakeActions = {
  loadModelsMake,
  loadedModelsMakeSuccess,
  loadedModelsMakeFailure
};
