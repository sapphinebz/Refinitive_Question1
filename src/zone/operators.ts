import { NgZone } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';

export function zonefull<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable((subscriber) =>
      source.subscribe({
        next: (value) => ngZone.run(() => subscriber.next(value)),
        error: (error) => ngZone.run(() => subscriber.error(error)),
        complete: () => ngZone.run(() => subscriber.complete()),
      })
    );
}

export function zonefree<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable((subscriber) =>
      ngZone.runOutsideAngular(() => source.subscribe(subscriber))
    );
}

export function zoneOptimized<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return pipe(zonefree(ngZone), zonefull(ngZone));
}
