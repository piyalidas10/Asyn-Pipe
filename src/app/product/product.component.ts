import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { Product } from '../model/product.model';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isLoaded = true;
  productLists: Product[] = [];
  productCategories = ['dairy', 'vegetable', 'fruit'];
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
