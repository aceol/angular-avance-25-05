import { CurrencyPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../product/product.types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CurrencyPipe],
})
export class ProductDetailsComponent {
  //@Input({ required: true }) product!: Product;
  product = input.required<Product>();
}
