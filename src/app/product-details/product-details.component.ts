import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CurrencyPipe],
})
export class ProductDetailsComponent {
  @Input({ required: true }) product!: Product;
}
