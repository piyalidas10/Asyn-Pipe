import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from '../product/product.component';

@NgModule({
  declarations: [ProductListComponent, ProductComponent],
  exports: [ProductComponent],
  providers: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }