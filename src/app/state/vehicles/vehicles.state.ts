import { MakeModel } from "src/app/core/models/make.interface";

export interface MakesState{
  loading: boolean,
  makes: ReadonlyArray<MakeModel>,
  selectedMake: MakeModel
}
