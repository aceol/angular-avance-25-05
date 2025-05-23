import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer.types';
import { BasketFormComponent } from './basket-form/basket-form.component';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, CurrencyPipe, BasketFormComponent],
})
export class BasketComponent implements OnInit {
  protected customer: Customer = { name: '', address: '', creditCard: '' };
  private basketService = inject(BasketService);

  protected get basketTotal$(): Observable<number> {
    return this.basketService.total$;
  }

  protected get basketItems$(): Observable<BasketItem[]> {
    return this.basketService.items$;
  }

  ngOnInit(): void {
    this.basketService.fetch().subscribe();
  }
}
