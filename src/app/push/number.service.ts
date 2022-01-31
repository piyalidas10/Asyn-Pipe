import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberService {
  immutableValue$ = new BehaviorSubject<number>(1);
  immutableValue = 1;  
  mutableValue = {counter: 1};
  mutableValue$ = new BehaviorSubject<object>(this.mutableValue);
  constructor() { 
    setInterval(() => this.randomValue(), 2000);
  }

  randomValue(): void {
    const randomVal = Math.random();
    this.immutableValue$.next(randomVal);
    this.immutableValue = randomVal;

    this.mutableValue.counter = randomVal;
    this.mutableValue$.next(this.mutableValue);
  }
}
