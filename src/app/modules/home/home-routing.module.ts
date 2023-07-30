import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'vehicle', loadChildren: () => import('../vehicles/vehicle.module').then(m => m.VehicleModule) },
      { path: 'game', loadChildren: () => import('../games/games.module').then(m => m.GamesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
