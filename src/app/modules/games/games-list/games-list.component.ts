import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Columns } from 'src/app/core/models/column.interface';
import { GameModel } from 'src/app/core/models/game.interface';
import { AppState } from 'src/app/state/app.state';
import { gamesActions } from 'src/app/state/games/games.actions';
import { selectGamesLoading, selectListGames } from 'src/app/state/games/games.selectors';

@Component({
  selector: 'app-games',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  title: string = "Lista de Juegos"
  games$: Observable<readonly GameModel[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  //Table
  dataSource!: MatTableDataSource<GameModel[]>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  subscriptions: Subscription[] = [];
  defaultFilterPredicate!: (data: GameModel[], filter: string) => boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router
    ){}

  ngOnInit(): void {
    this.store.dispatch(gamesActions.loadGames());
    this.loading$ = this.store.select(selectGamesLoading);
    this.games$ = this.store.select(selectListGames);
    this.subscriptions.push(
      this.games$.subscribe( (games:any) => {
      this.dataSource = new MatTableDataSource(games);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.defaultFilterPredicate = this.dataSource.filterPredicate;
    }));

  }

  columns: Columns[] = [
    {
      dataField: 'id',
      dataType: 'string',
      caption: 'ID',
      visible: true,
      canFilter: true
    },
    {
      dataField: 'name',
      dataType: 'string',
      caption: 'Nombre',
      visible: true,
      canFilter: true
    },
    {
      dataField: 'releaseDate',
      dataType: 'string',
      caption: 'Fecha de Lanzamiento',
      visible: true,
      canFilter: true
    },
    {
      dataField: 'actions',
      dataType: 'actions',
      caption: 'Acciones',
      visible: true,
      canFilter: false
    }

  ];

  filterValues = this.columns
    .filter(column => column.canFilter)
    .reduce((acc, column) => {
      acc[column.dataField] = '';
      return acc;
    }, {} as string | any);

  getVisibleColumnNames(): string[] {
    return this.columns.filter(column => column.visible).map(column => column.dataField);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate =  this.defaultFilterPredicate; // or undefined
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterForColumn(column: string, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValues[column] = filterValue;
    this.applyFilterPredicate();
  }

  applyFilterPredicate() {
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      for (const column of Object.keys(searchTerms)) {
        const columnValue = String(data[column]).toLowerCase();
        const searchTermValue = String(searchTerms[column]).toLowerCase();
        if (columnValue.indexOf(searchTermValue) === -1) {
          return false;
        }
      }
      return true;
    };
    return filterFunction;
  }

  editGame(game: GameModel) {
    this.router.navigate(['/game/edit/', game.id]);
  }

  deleteGame(game: GameModel) {
    if (confirm('Está seguro de que desea eliminar el juego '+ game.name)) {
      this.store.dispatch(gamesActions.deleteGame({ gameId: game.id }));
    }
  }

  addGame() {
    this.router.navigate(['/game/new']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

}
