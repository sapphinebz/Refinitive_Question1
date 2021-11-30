import { createReducer, on } from '@ngrx/store';
import { AppAction } from './counter.action';

export namespace AppReducer {
  export interface AppState {
    counter: number;
    pokemons: any[];
  }

  export const counterReducer = createReducer<number>(
    0,
    on(AppAction.plus, (prevState, action) => {
      return (prevState += action.value);
    }),
    on(AppAction.minus, (prevState, action) => {
      return (prevState -= action.value);
    })
  );
}
