import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, CurrencyPipe],
})
export class ProductDetailsComponent {
  protected product?: Product;
  //#changeDetectorRef = inject(ChangeDetectorRef);
  //product$ = new BehaviorSubject<Product | null>(null);
  product$: Observable<Product>;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.product$ = this.apiService.getProduct(this.activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY]);
    //.subscribe((product) => {
    //  this.product$.next(product);
    //  this.#changeDetectorRef.markForCheck();
    //});
  }
}
