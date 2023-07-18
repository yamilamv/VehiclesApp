import { createReducer, on } from "@ngrx/store";
import { vehiclesTypeActions } from "./vehiclesType.actions";
import { VehiclesTypeState } from "./vehiclesType.state";

//Estado Inicial (vacio)
export const initialState: VehiclesTypeState = {
  loading:false, vehiclesType: []
}

export const vehiclesTypeReducer = createReducer(
  initialState,
  on(vehiclesTypeActions.loadVehiclesTypes, (state) => {
    return {
      ...state,
      loading:true
    };
  }),
  on(vehiclesTypeActions.loadedVehiclesTypesSuccess, (state, props) => {
    return {
      ...state,
      loading:false,
      vehiclesType: props.vehiclesType
    };
  }),
  on(vehiclesTypeActions.loadedVehiclesTypesFailure, (state, action) => {
		return {
			...state,
			loading: false,
			error: action.error
		};
	}),

);
