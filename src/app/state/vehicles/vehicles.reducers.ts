import { createReducer, on } from "@ngrx/store";
import { MakesState } from "./vehicles.state";
import { vehiclesActions } from "./vehicles.actions";

//Estado Inicial (vacio)
export const initialState: MakesState = {
  loading:false, makes: [], selectedMake: {
    Make_ID: 0,
    Make_Name: ""
  }
}

export const makesReducer = createReducer(
  initialState,
  on(vehiclesActions.loadMakes, (state) => {
    return {
      ...state,
      loading:true
    };
  }),
  on(vehiclesActions.loadedMakesSuccess, (state, props) => {
    return {
      ...state,
      loading:false,
      makes: props.makes
    };
  }),
  on(vehiclesActions.loadedMakesFailure, (state, props) => {
		return {
			...state,
			loading: false,
			error: props.error
		};
	}),
  on(vehiclesActions.selectMake, (state, props) => {
		return {
			...state,
      selectedMake: props.make
		};
	})

);
