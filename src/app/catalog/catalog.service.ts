import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  #products$ = new BehaviorSubject<Product[]>([]);
  products$ = this.#products$.asObservable();

  private apiService = inject(ApiService);

  fetch(): Observable<undefined> {
    return this.apiService.getProducts().pipe(
      tap((items) => this.#products$.next(items)),
      map(() => undefined),
    );
  }

  get isStockEmpty$(): Observable<boolean> {
    return this.#products$.pipe(map((products: Product[]) => products.every(({ stock }) => stock === 0)));
  }

  decreaseStock(productId: string): void {
    this.#products$.next(
      this.#products$.value.map((product: Product) => {
        if (product.id === productId) {
          return { ...product, stock: product.stock - 1 };
        }
        return product;
      }),
    );
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }
}
