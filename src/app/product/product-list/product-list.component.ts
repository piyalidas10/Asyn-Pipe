import { Component, Input, OnChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() productListsByCat;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.productListsByCat);
  }

}
