# Async Pipe’s benefits over subscribe
The Service fetch the data returns an observable. To get the observable’s value, you need to call subscribe() on the observable. And everytime you need to call subscribe() and unsubscribe() later on. You can easily forget to unsubscribe. You can achieve this suing Async pipe.

1. The Async Pipe calls subscribe() automatically and returns the emitted values. When the component is destroyed, it automatically calls unsubscribe(). Using subscribe() introduces a complementary need to unsubscribe at the end of the component life-cycle to avoid memory leaks and better performance. Developers have to unsubscribe manually. The most RxJS (declarative) common way to do this is to using takeUntil(unsubscribe$).

Suppose you have to show multiple product category lists. I have written one service to fetch data as observable.

```
getAllProducts(): Observable<any> {
    return this.http.get<Product[]>(this.apiURL, this.requestHeader)
    .pipe(
        map(res => res),
        shareReplay(),
        catchError(this.handleError)
    );
}
```

Now i have created one product component and product list component. Product list component is child component for showing product lists.

#### product.component.html
```
<div class=”productAll”>
    <div class=”product”>
        <app-product-list [productListsByCat]=”dairyProducts$”></app-product-list>
    </div>
    <div class=”product”>
        <app-product-list [productListsByCat]=”vegetableProducts$”></app-product-list>
    </div>
    <div class=”product”>
        <app-product-list [productListsByCat]=”fruitProducts$”></app-product-list>
    </div>
</div>
```

#### product.component.ts
```
import { Component, OnInit } from ‘@angular/core’;
import { Observable } from ‘rxjs’;
import { map} from ‘rxjs/operators’;
import { Product } from ‘../model/product.model’;
import { ApiService } from ‘../services/api.service’;
@Component({
    selector: ‘app-product’,
    templateUrl: ‘./product.component.html’,
    styleUrls: [‘./product.component.css’]
})
export class ProductComponent implements OnInit {
    isLoaded = true;
    productLists: Product[] = [];
    productCategories = [‘dairy’, ‘vegetable’, ‘fruit’];
    dairyProducts$: Observable<Product[]>;
    vegetableProducts$: Observable<Product[]>;
    fruitProducts$: Observable<Product[]>;
    constructor(private apiService: ApiService) {
    }
    ngOnInit(): void {
        const products$ = this.apiService.getAllProducts().pipe(map(prods => prods));
        this.dairyProducts$ = products$.pipe(map(prods => prods.filter(prod => prod.type === this.productCategories[0])));
        this.vegetableProducts$ = products$.pipe(map(prods => prods.filter(prod => prod.type === this.productCategories[1])));
        this.fruitProducts$ = products$.pipe(map(prods => prods.filter(prod => prod.type === this.productCategories[2])));
    }
}
```

#### product-list.component.html
```
<div class=”productBox” *ngFor=”let prod of (productListsByCat | async)”>
    <h4>{{prod.title}}</h4>
    <p>{{prod.description}}</p>
</div>
```

#### product-list.component.ts
```
import { Component, Input, OnChanges, OnInit } from ‘@angular/core’;
@Component({
    selector: ‘app-product-list’,
    templateUrl: ‘./product-list.component.html’,
    styleUrls: [‘./product-list.component.css’]
})
export class ProductListComponent implements OnInit, OnChanges {
    @Input() productListsByCat;
    constructor() {
    }
    ngOnInit(): void {
    }
}
```

2. The OnPush change detection strategy is great for performance, so we should be using Async pipe as much as possible. With onPush change detection strategy, it marks component for check when data changes. If you use OnPush, then better approach is to work with observable data by using Async pipe. In onPush change detection strategy, if observable data changes it automatically marks component for the check using Async pipe.
If you are not using Async pipe then data change will not change using onPush change.

Here is the code for explanation

#### push.component.ts (Parent component)
```
<h1>Async Component</h1>
<app-async></app-async>
<h1>Without Async Component</h1>
<app-withoutasync></app-withoutasync>
```

#### number.service.ts
```
import { Injectable } from ‘@angular/core’;
import { BehaviorSubject } from ‘rxjs’;
@Injectable({
    providedIn: ‘root’
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
```

I have created two child components withoutasync and async.

#### withoutasync.component.html
```
// immutable
<h3>{{immutableValue | json}}</h3>
// mutable
<h3>{{mutableValue | json}}</h3>
```

#### withoutasync.component.ts
```
import { ChangeDetectionStrategy, Component, Input, OnInit } from ‘@angular/core’;
import { NumberService } from ‘../number.service’;
@Component({
    selector: ‘app-withoutasync’,
    templateUrl: ‘./withoutasync.component.html’,
    styleUrls: [‘./withoutasync.component.css’],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutasyncComponent implements OnInit {
    mutableValue = this.numSrv.mutableValue;
    immutableValue = this.numSrv.immutableValue;
    constructor(private numSrv: NumberService) {
    }
    ngOnInit(): void {
    }
}
```

#### async.component.html
```
// immutable
<h3>{{immutableValue$ | async | json}}</h3>
// mutable
<h3>{{mutableValue$ | async | json}}</h3>
```

#### async.component.ts
```
import { ChangeDetectionStrategy, Component, Input, OnInit } from ‘@angular/core’;
import {NumberService} from ‘../number.service’;
@Component({
    selector: ‘app-async’,
    templateUrl: ‘./async.component.html’,
    styleUrls: [‘./async.component.css’],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncComponent implements OnInit {
    mutableValue$ = this.numSrv.mutableValue$;
    immutableValue$ = this.numSrv.immutableValue$;
    constructor(private numSrv: NumberService) {
    }
    ngOnInit(): void {
    }
}
```

### Practical Example
https://stackblitz.com/edit/understanding-the-async-pipe?file=src%2Fapp%2Fsmart%2Fsmart.component.ts