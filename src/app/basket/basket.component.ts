import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, AsyncPipe, CurrencyPipe],
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.basketService.fetch().subscribe();
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
