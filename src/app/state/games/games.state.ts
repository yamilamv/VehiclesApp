import { GameModel } from "src/app/core/models/game.interface";

export interface GamesState{
  loading: boolean,
  games: ReadonlyArray<GameModel>,
  game: GameModel | null
}
