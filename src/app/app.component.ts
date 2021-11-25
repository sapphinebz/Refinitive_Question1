import { Component, NgZone, OnDestroy } from '@angular/core';
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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'questionOne';
  worker = new Worker(new URL('./cal.worker', import.meta.url));
  calculateOptions: CalculationOption[] = ['isPrime', 'isFibonacci'];
  typeAction = new Subject<HTMLInputElement>();
  calculateAction = new BehaviorSubject<CalculationOption>(
    this.calculateOptions[0]
  );
  number$ = this.typeAction.pipe(
    debounceTime(400),
    map((inputEl) => {
      const value = inputEl.value;
      let actualValue: number;
      if (!this.valueIsStringNumber(value)) {
        actualValue = Number(value);
      } else if (Number(value) < 0) {
        actualValue = 1;
      } else {
        actualValue = Number(value);
      }
      inputEl.value = `${actualValue}`;
      return actualValue;
    }),
    filter((valueAsNumber) => isFinite(valueAsNumber)),
    zoneOptimized(this.zone)
  );

  result = '';
  messageId = 1;

  private destroy$ = new Subject<void>();
  constructor(private zone: NgZone) {
    this.number$.pipe(takeUntil(this.destroy$)).subscribe();

    combineLatest([this.number$, this.calculateAction])
      .pipe(
        switchMap(([valueAsNumber, calculateOption]) => {
          this.messageId++;
          this.worker.postMessage({
            id: this.messageId,
            valueAsNumber,
            calculateOption,
          });
          this.result = 'calculating...';
          return fromEvent<{ data: { id: number; result: boolean } }>(
            this.worker,
            'message'
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((ev) => {
        const { data } = ev;
        const { id, result } = data;
        this.result = `${result}`;
      });
  }

  onType(inputEl: HTMLInputElement) {
    this.typeAction.next(inputEl);
  }

  onSelectOption(selectEl: HTMLSelectElement) {
    this.calculateAction.next(selectEl.value as CalculationOption);
  }

  valueIsStringNumber(value: any) {
    return /^[\-\+]*[\d]+$/.test(value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
