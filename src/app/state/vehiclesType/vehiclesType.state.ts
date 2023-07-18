import { VehicleTypeModel } from "src/app/core/models/vehicleType.interface";

export interface VehiclesTypeState{
  loading: boolean,
  vehiclesType: ReadonlyArray<VehicleTypeModel>
}
