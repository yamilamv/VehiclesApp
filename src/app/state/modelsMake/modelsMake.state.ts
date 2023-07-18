import { ModelMakeModel } from "src/app/core/models/modelMake";

export interface ModelsMakeState{
  loading: boolean,
  modelsMake: ReadonlyArray<ModelMakeModel>
}
