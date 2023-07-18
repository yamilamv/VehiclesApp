import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { MakesState } from "./vehicles.state";

export const selectMakes = (state: AppState) => state.makes;

export const selectListMakes = createSelector(
  selectMakes,
  (state: MakesState) => state.makes
) ;

export const selectMakesLoading = createSelector(
  selectMakes,
  (state: MakesState) => state.loading
) ;

export const selectedMake = createSelector(
  selectMakes,
  (state: MakesState) => state.selectedMake
) ;
