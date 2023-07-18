import { createAction, props } from '@ngrx/store';
import { VehicleTypeModel } from 'src/app/core/models/vehicleType.interface';

export const loadVehiclesTypes = createAction(
  '[Vehicles Type] Load Vehicles Types',
  props<{ makeId:number }>()
);

export const loadedVehiclesTypesSuccess = createAction(
'[Vehicles Type] Loaded Vehicles Types Success',
props<{ vehiclesType: VehicleTypeModel[] }>()
);

export const loadedVehiclesTypesFailure = createAction(
'[Vehicles Type] Loaded Vehicles Types Failure',
props<{ error: any }>()
);

export const vehiclesTypeActions = {
  loadVehiclesTypes,
  loadedVehiclesTypesSuccess,
  loadedVehiclesTypesFailure
};
