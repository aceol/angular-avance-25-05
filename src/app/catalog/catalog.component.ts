import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { BasketService } from '../basket/basket.service';
import { Product } from '../product/product.types';
import { WELCOME_MSG } from '../shared/app.token';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  private basketService = inject(BasketService);
  private catalogService = inject(CatalogService);
  protected welcomeMsg = inject(WELCOME_MSG);
  #alertService = inject(AlertService);

  protected get products$() {
    return this.catalogService.products$;
  }

  protected get isStockEmpty$(): Observable<boolean> {
    return this.catalogService.isStockEmpty$;
  }

  protected get basketTotal$(): Observable<number> {
    return this.basketService.total$;
  }

  ngOnInit(): void {
    this.catalogService
      .fetch()
      .pipe(
        catchError(() => {
          console.log('should alert');
          this.#alertService.addDanger("😲 Désolé, impossible d'accéder au catalogue.");
          return EMPTY;
        }),
      )
      .subscribe();

    this.basketService.fetch().subscribe({
      next: console.log,
      error: () => this.#alertService.addDanger("😲 Désolé, impossible d'accéder au panier."),
    });
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => this.catalogService.decreaseStock(product.id));
  }

  protected isAvailable(product: Product): boolean {
    return this.catalogService.isAvailable(product);
  }
}
