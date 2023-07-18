import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModelMakeModel } from 'src/app/core/models/modelMake';
import { AppState } from 'src/app/state/app.state';
import { selectListModelsMake, selectModelsMakeLoading } from 'src/app/state/modelsMake/modelsMake.selectors';

@Component({
  selector: 'app-models-make',
  templateUrl: './models-make.component.html',
  styleUrls: ['./models-make.component.scss']
})
export class ModelsMakeComponent {
  modelsMake$: Observable<readonly ModelMakeModel[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.modelsMake$ = this.store.select(selectListModelsMake);
    this.loading$ = this.store.select(selectModelsMakeLoading);
  }

}
