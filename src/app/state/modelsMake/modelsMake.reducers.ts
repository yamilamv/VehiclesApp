import { modelsMakeActions } from './modelsMake.actions';
import { createReducer, on } from "@ngrx/store";
import { ModelsMakeState } from "./modelsMake.state";

//Estado Inicial (vacio)
export const initialState: ModelsMakeState = {
  loading:false, modelsMake: []
}

export const modelsMakeReducer = createReducer(
  initialState,
  on(modelsMakeActions.loadModelsMake, (state) => {
    return {
      ...state,
      loading:true
    };
  }),
  on(modelsMakeActions.loadedModelsMakeSuccess, (state, props) => {
    return {
      ...state,
      loading:false,
      modelsMake: props.modelsMake
    };
  }),
  on(modelsMakeActions.loadedModelsMakeFailure, (state, action) => {
		return {
			...state,
			loading: false,
			error: action.error
		};
	}),

);
