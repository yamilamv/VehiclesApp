import { ActionReducerMap } from "@ngrx/store";
import { MakesState } from "./vehicles/vehicles.state";
import { makesReducer } from "./vehicles/vehicles.reducers";
import { VehiclesTypeState } from "./vehiclesType/vehiclesType.state";
import { vehiclesTypeReducer } from "./vehiclesType/vehiclesType.reducers";
import { ModelsMakeState } from "./modelsMake/modelsMake.state";
import { modelsMakeReducer } from "./modelsMake/modelsMake.reducers";
import { GamesState } from "./games/games.state";
import { GamesReducer } from "./games/games.reducers";

export interface AppState {
  makes: MakesState,
  vehiclesType: VehiclesTypeState,
  modelsMake: ModelsMakeState,
  games: GamesState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  makes:makesReducer,
  vehiclesType: vehiclesTypeReducer,
  modelsMake:modelsMakeReducer,
  games: GamesReducer
}
