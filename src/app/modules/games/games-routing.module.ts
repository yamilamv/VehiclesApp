import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games-list/games-list.component';
import { GameEditComponent } from './game-edit/game-edit.component';

const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'edit/:gameId', component: GameEditComponent },
  { path: 'new', component: GameEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
