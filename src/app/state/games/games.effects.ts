import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { GamesService } from 'src/app/core/services/Games/games.service';
import { gamesActions } from './games.actions';
import { GameModel } from 'src/app/core/models/game.interface';

@Injectable()
export class GamesEffects {

 loadGames$ = createEffect(() => this.actions$.pipe(
    ofType(gamesActions.loadGames),
    mergeMap(() => this.gamesService.getGames()
      .pipe(
        map((data: any) => {
          return gamesActions.loadedGamesSuccess({
            games: data
          });
        }),
        catchError((error:any) => {
          return of(
            gamesActions.loadedGamesFailure({ error })
          );
        })
      ))
    )
  );

  getGame$ = createEffect(() => this.actions$.pipe(
    ofType(gamesActions.getGame),
    mergeMap(({gameId}) => this.gamesService.getGameById(gameId)
      .pipe(
        map((data: GameModel) => {
          return gamesActions.getGameSuccess({
            game: data
          });
        }),
        catchError((error:any) => {
          return of(
            gamesActions.getGameFailure({ error })
          );
        })
      ))
    )
  );


  updateGame$ = createEffect(() => this.actions$.pipe(
    ofType(gamesActions.updateGame),
    mergeMap(({game}) => this.gamesService.updateGame(game.id, game)
      .pipe(
        map((data: GameModel) => {
          this.router.navigate(['/game/']);
          return gamesActions.updateGameSuccess({
            game: data
          });

        }),
        catchError((error:any) => {
          return of(
            gamesActions.updateGameFailure({ error })
          );
        })
      ))
    )
  );

  deleteGame$ = createEffect(() => this.actions$.pipe(
    ofType(gamesActions.deleteGame),
    mergeMap(({gameId}) => this.gamesService.deleteGame(gameId)
      .pipe(
        map(() => {
          return gamesActions.deleteGameSuccess({
            gameId: gameId
          });
        }),
        catchError((error:any) => {
          return of(
            gamesActions.deleteGameFailure({ error })
          );
        })
      ))
    )
  );

  createGame$ = createEffect(() => this.actions$.pipe(
    ofType(gamesActions.createGame),
    mergeMap(({game}) => this.gamesService.createGame(game)
      .pipe(
        map((data: GameModel) => {
          this.router.navigate(['/game/']);
          return gamesActions.createGameSuccess({
            game: data
          });

        }),
        catchError((error:any) => {
          return of(
            gamesActions.createGameFailure({ error })
          );
        })
      ))
    )
  );




  constructor(
    private actions$: Actions,
    private gamesService: GamesService,
    private router: Router
  ) {}
}
