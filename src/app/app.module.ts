import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { ROOT_REDUCERS } from './state/app.state';
import { MakesEffects } from './state/vehicles/vehicles.effects';
import { HttpClientModule } from '@angular/common/http';
import { VehiclesTypeEffects } from './state/vehiclesType/vehiclesType.effects';
import { ModelsMakeEffects } from './state/modelsMake/modelsMake.effects';
import { GamesEffects } from './state/games/games.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(
      ROOT_REDUCERS
    ),
    StoreDevtoolsModule.instrument({ name: 'Test' }),
    EffectsModule.forRoot([MakesEffects, VehiclesTypeEffects, ModelsMakeEffects, GamesEffects]) //TODO: Exportar en el estado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
