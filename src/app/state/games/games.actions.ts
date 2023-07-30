import { createAction, props } from '@ngrx/store';
import { GameModel } from 'src/app/core/models/game.interface';

//Get Games
export const loadGames = createAction(
    '[Games] Load Games'
);

export const loadedGamesSuccess = createAction(
  '[Games] Loaded Games Success',
  props<{ games: GameModel[] }>()
);

export const loadedGamesFailure = createAction(
	'[Games] Load Games Failure',
	props<{ error: any }>()
);

//Get One Game
export const getGame = createAction(
  '[Games] Get Game',
  props<{ gameId: number }>()
);

export const getGameSuccess = createAction(
'[Games] Get Game Success',
props<{ game: GameModel }>()
);

export const getGameFailure = createAction(
'[Games] Get Game Failure',
props<{ error: any }>()
);

//Update Game
export const updateGame = createAction(
  '[Games] Update Game',
  props<{ game: GameModel }>()
);

export const updateGameSuccess = createAction(
'[Games] Update Game Success',
 props<{ game: GameModel }>()
);

export const updateGameFailure = createAction(
'[Games] Update Game Failure',
props<{ error: any }>()
);

//Delete Game
export const deleteGame = createAction(
  '[Games] Delete Game',
  props<{ gameId: number }>()
);

export const deleteGameSuccess = createAction(
'[Games] Delete Game Success',
 props<{ gameId: number }>()
);

export const deleteGameFailure = createAction(
'[Games] Delete Game Failure',
props<{ error: any }>()
);

//Create Game
export const createGame = createAction(
  '[Games] Create Game',
  props<{ game: GameModel }>()
);

export const createGameSuccess = createAction(
'[Games] Create Game Success',
 props<{ game: GameModel }>()
);

export const createGameFailure = createAction(
'[Games] Create Game Failure',
props<{ error: any }>()
);

export const gamesActions = {
	loadGames,
  loadedGamesSuccess,
  loadedGamesFailure,
  getGame,
  getGameSuccess,
  getGameFailure,
  updateGame,
  updateGameSuccess,
  updateGameFailure,
  deleteGame,
  deleteGameSuccess,
  deleteGameFailure,
  createGame,
  createGameSuccess,
  createGameFailure
};
