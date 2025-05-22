import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from './product.types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [RouterLink, UpperCasePipe, CurrencyPipe],
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToBasket = new EventEmitter<Product>();

  protected onClick(): void {
    this.addToBasket.emit(this.product);
  }

  protected isTheLast(): boolean {
    return this.product.stock === 1;
  }
}
