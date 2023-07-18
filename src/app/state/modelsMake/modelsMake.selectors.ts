import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ModelsMakeState } from "./modelsMake.state";

export const selectModelsMake = (state: AppState) => state.modelsMake;

export const selectListModelsMake = createSelector(
  selectModelsMake,
  (state: ModelsMakeState) => state.modelsMake
) ;

export const selectModelsMakeLoading = createSelector(
  selectModelsMake,
  (state: ModelsMakeState) => state.loading
) ;
