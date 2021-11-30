import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './counter.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveComponentModule } from '@ngrx/component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonReducer } from './pokemon.reducer';
import { CounterEffect } from './counter.effect';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveComponentModule,
    HttpClientModule,
    StoreModule.forRoot<AppReducer.AppState>(
      {
        counter: AppReducer.counterReducer,
        pokemons: PokemonReducer.counterReducer,
      },
      {}
    ),
    EffectsModule.forRoot([CounterEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
