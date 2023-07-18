import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { VehiclesTypeState } from "./vehiclesType.state";

export const selectVehiclesType = (state: AppState) => state.vehiclesType;

export const selectListVehiclesType = createSelector(
  selectVehiclesType,
  (state: VehiclesTypeState) => state.vehiclesType
) ;

export const selectVehiclesTypeLoading = createSelector(
  selectVehiclesType,
  (state: VehiclesTypeState) => state.loading
) ;
