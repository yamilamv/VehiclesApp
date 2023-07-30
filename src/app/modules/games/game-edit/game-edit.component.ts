import { getGame } from './../../../state/games/games.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GameModel, GameModelHelper } from 'src/app/core/models/game.interface';
import { AppState } from 'src/app/state/app.state';
import { gamesActions } from 'src/app/state/games/games.actions';
import { selectGame } from 'src/app/state/games/games.selectors';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit, OnDestroy {
  title = 'Detalle de Juego';
  game!: GameModel;

  //TODO crear store
  platforms: { id:number; name: string; checked: boolean;}[] = [
    {
      "id": 1,
      "name": "Xbox One",
      "checked": false
    },
    {
      "id": 2,
      "name": "PlayStation 4",
      "checked": false
    },
    {
      "id": 3,
      "name": "PC",
      "checked": false
    }
  ]

  subscriptions: Subscription[] = [];
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void{
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(params => {
        if(params['gameId']){
          this.store.dispatch(gamesActions.getGame({ gameId: params['gameId'] }));
          this.subscriptions.push(
            this.store.select(selectGame).subscribe(game => {
              if (game != null) {
                this.game = {...game};
                this.platforms = this.platforms.map(p => {
                  p.checked = game.platforms.indexOf(p.id) >= 0;
                  return p;
                });
              }
            })
          );
        }else{
           this.game = GameModelHelper.default();
        }

      })
     );



  }

  onSaveGame(){
    this.game.platforms = this.platforms.filter((p) => p.checked === true).map(p => p.id);
    if(this.game.id){
      this.store.dispatch(gamesActions.updateGame({game: this.game}));
    }else{
      this.store.dispatch(gamesActions.createGame({game: this.game}));
    }
   }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) =>
    subscription.unsubscribe()
  );

  }
}
