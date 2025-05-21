import { inject, Injectable } from '@angular/core';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  
  public products: Product[] = []

  private apiService = inject(ApiService);

  fetch(): Observable<Product[]> {
    return this.apiService.getProducts().pipe(tap((items) => (this.products = items)));
  }

  get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }

  decreaseStock(productId: string): void {
    this.products = this.products.map((product: Product) => {
      if(product.id === productId){
        return {...product, stock: product.stock -1}
      }
      return product
    })
  }

  isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }
}
