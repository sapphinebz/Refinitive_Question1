import { AppReducer } from './counter.reducer';

export namespace PokemonSelector {
  export const selectPokemon = (state: AppReducer.AppState) => state.pokemons;
}
