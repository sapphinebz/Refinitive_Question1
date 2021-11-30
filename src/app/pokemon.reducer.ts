import { createReducer, on } from '@ngrx/store';
import { AppAction } from './counter.action';

export namespace PokemonReducer {
  export const counterReducer = createReducer<any[]>(
    [],
    on(AppAction.loadPokemonSuccess, (prevState, action) => {
      return action.pokemons;
    })
  );
}
