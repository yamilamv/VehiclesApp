import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { GamesState } from "./games.state";

export const selectGames = (state: AppState) => state.games;

export const selectListGames = createSelector(
  selectGames,
  (state: GamesState) => state.games
) ;

export const selectGamesLoading = createSelector(
  selectGames,
  (state: GamesState) => state.loading
) ;

export const selectGame = createSelector(
  selectGames,
  (state: GamesState) => state.game
) ;

