import { Component, NgZone, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { CalculationOption } from 'src/models/calculate.model';
import { zoneOptimized } from 'src/zone/operators';
import { AppAction } from './counter.action';
import { AppReducer } from './counter.reducer';
import { AppSelector } from './counter.selector';
import { PokemonSelector } from './pokemon.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'questionOne';
  counter$ = this.store.select(AppSelector.selectCounter);
  pokemon$ = this.store.select(PokemonSelector.selectPokemon);

  constructor(private store: Store<AppReducer.AppState>) {}

  ngOnDestroy(): void {}

  plus() {
    this.store.dispatch(AppAction.plus({ value: 1 }));
  }

  minus() {
    this.store.dispatch(AppAction.minus({ value: 1 }));
  }

  loadPokemon() {
    this.store.dispatch(AppAction.loadPokemon({ limit: 10, offset: 0 }));
  }
}
