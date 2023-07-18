import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { VehiclesDetailComponent } from './vehicles-detail/vehicles-detail.component';

const routes: Routes = [
  { path: '', component: VehiclesListComponent },
  { path: 'details/:makeId', component: VehiclesDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
