import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games-list/games-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameEditComponent } from './game-edit/game-edit.component';



@NgModule({
  declarations: [
    GamesComponent,
    GameEditComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule
  ]
})
export class GamesModule { }
