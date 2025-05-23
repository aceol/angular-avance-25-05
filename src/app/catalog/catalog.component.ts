import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { BasketService } from '../basket/basket.service';
import { ProductComponent } from '../product/product.component';
import { Product } from '../product/product.types';
import { WELCOME_MSG } from '../shared/app.token';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgFor, NgIf, ProductComponent, AsyncPipe, CurrencyPipe],
  providers: [
    {
      provide: WELCOME_MSG,
      useValue: 'Bienvenue sur Zenika Ecommerce',
    },
  ],
})
export class CatalogComponent {
  private basketService = inject(BasketService);
  private catalogService = inject(CatalogService);
  protected welcomeMsg = inject(WELCOME_MSG);

  protected get products$() {
    return this.catalogService.products$;
  }

  protected get isStockEmpty$(): Observable<boolean> {
    return this.catalogService.isStockEmpty$;
  }

  protected get basketTotal$(): Observable<number> {
    return this.basketService.total$;
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => this.catalogService.decreaseStock(product.id));
  }

  protected isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}
