import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehiclesDetailComponent } from './vehicles-detail/vehicles-detail.component';
import { VehiclesTypeComponent } from './vehicles-type/vehicles-type.component';
import { ModelsMakeComponent } from './models-make/models-make.component';

@NgModule({
  declarations: [
    VehiclesListComponent,
    VehiclesDetailComponent,
    VehiclesTypeComponent,
    ModelsMakeComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    SharedModule
  ]
})
export class VehicleModule { }
