import { createAction, props } from '@ngrx/store';

export namespace AppAction {
  export const plus = createAction(
    '[App Module] plus',
    props<{ value: number }>()
  );

  export const minus = createAction(
    '[App Module] minus',
    props<{ value: number }>()
  );

  export const loadPokemon = createAction(
    '[App Module] loadPokemon',
    props<{ limit: number; offset: number }>()
  );

  export const loadPokemonSuccess = createAction(
    '[App Module] loadPokemonSuccess',
    props<{ pokemons: any[] }>()
  );
}
