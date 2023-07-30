import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResult } from '../../models/genericResult.interface';
import { ModelMakeModel } from '../../models/modelMake';
import { API_BASE_URL } from 'src/app/enviroments/environment';
import { GameModel } from '../../models/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private apiUrl = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  getGames(): Observable<GameModel[]> {
		const entity = 'games';
    return this.httpClient.get<GameModel[]>(
			`${this.apiUrl}${entity}`,
			{}
		);
	}

  getGameById(id:number): Observable<GameModel> {
		const entity = 'games';
    return this.httpClient.get<GameModel>(
			`${this.apiUrl}${entity}/${id}`,
			{}
		);
	}

  updateGame(id:number, game: GameModel){
    const entity = 'games';
    return this.httpClient.put<GameModel>(
			`${this.apiUrl}${entity}/${id}`,
			game
		);
  }

  deleteGame(id:number){
    const entity = 'games';
    return this.httpClient.delete<GameModel>(
			`${this.apiUrl}${entity}/${id}`,
      {}
		);
  }


 createGame(game: GameModel){
    const entity = 'games';
    return this.httpClient.post<GameModel>(
			`${this.apiUrl}${entity}`,
			game
		);
  }

}
