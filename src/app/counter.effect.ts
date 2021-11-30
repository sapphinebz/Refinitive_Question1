import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { AppAction } from './counter.action';

@Injectable()
export class CounterEffect {
  pokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppAction.loadPokemon),
      switchMap((action) => {
        const params = new HttpParams({
          fromObject: { limit: action.limit, offset: action.offset },
        });
        return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon`, {
          params,
        });
      }),
      map((response) => {
        return AppAction.loadPokemonSuccess({ pokemons: response.results });
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {}
}
