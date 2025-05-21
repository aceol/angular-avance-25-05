import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../product/product.types';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';
import { WELCOME_MSG } from '../shared/app.token';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class CatalogComponent implements OnInit{

  private basketService = inject(BasketService);
  private catalogService = inject(CatalogService);
  protected welcomeMsg = inject(WELCOME_MSG);

  protected get products() {
    return this.catalogService.products;
  }

  protected get isStockEmpty(): boolean {
    return this.catalogService.isStockEmpty;
  }

  protected get basketTotal(): number {
    return this.basketService.total
  }

  ngOnInit(): void {
      this.catalogService.fetch().subscribe();
      this.basketService.fetch().subscribe();
  }

  protected addToBasket(product: Product): void {
      this.basketService.addItem(product.id)
      .subscribe(() =>this.catalogService.decreaseStock(product.id));
  }

   protected isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}
