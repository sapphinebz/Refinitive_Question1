import { AppReducer } from './counter.reducer';

export namespace AppSelector {
  export const selectCounter = (state: AppReducer.AppState) => state.counter;
}
