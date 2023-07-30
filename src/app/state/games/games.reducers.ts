import { createReducer, on } from "@ngrx/store";
import { gamesActions } from "./games.actions";
import { GamesState } from "./games.state";

//Estado Inicial (vacio)
export const initialState: GamesState = {
  loading:false, games: [], game: null
}

export const GamesReducer = createReducer(
  initialState,
  on(gamesActions.loadGames, (state) => {
    return {
      ...state,
      loading:true
    };
  }),
  on(gamesActions.loadedGamesSuccess, (state, props) => {
    return {
      ...state,
      loading:false,
      games: props.games
    };
  }),
  on(gamesActions.loadedGamesFailure, (state, props) => {
		return {
			...state,
			loading: false,
			error: props.error
		};
	}),

  //Get Game
  on(gamesActions.getGame, (state) => {
    return {
      ...state
    };
  }),
  on(gamesActions.getGameSuccess, (state, props) => {
    return {
      ...state,
      game: props.game
    };
  }),
  on(gamesActions.loadedGamesFailure, (state, props) => {
		return {
			...state,
			error: props.error
		};
	}),

  //Update Game
  on(gamesActions.updateGame, (state, props) => {
    return {
      ...state
    };
  }),
  on(gamesActions.updateGameSuccess, (state, props) => {
    return {
      ...state,
      games: state.games.map((games) => games.id === props.game.id ? props.game : games),
      isLoading: false,
  };
  }),
  on(gamesActions.updateGameFailure, (state, props) => {
		return {
			...state,
			error: props.error
		};
	}),

   //Delete Game
   on(gamesActions.deleteGame, (state, props) => {
    return {
      ...state
    };
  }),
  on(gamesActions.deleteGameSuccess, (state, props) => {
    return {
      ...state,
      games: state.games.filter((games) => games.id != props.gameId),
      isLoading: false,
  };
  }),
  on(gamesActions.deleteGameFailure, (state, props) => {
		return {
			...state,
			error: props.error
		};
	}),

  //Create Game
  on(gamesActions.createGame, (state, props) => {
    return {
      ...state
    };
  }),
  on(gamesActions.createGameSuccess, (state, props) => {
    return {
      ...state,
      game: props.game,
      isLoading: false
  };
  }),
  on(gamesActions.createGameFailure, (state, props) => {
		return {
			...state,
			error: props.error
		};
	}),

);
