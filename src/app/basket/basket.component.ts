import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  standalone: false,
})
export class BasketComponent {
  protected customer: Customer = { name: '', address: '', creditCard: '' };
  private basketService = inject(BasketService)

  protected get basketTotal(): number {
    return this.basketService.total;
  }

  protected get basketItems(): BasketItem[] {
    return this.basketService.items;
  }

  constructor(
    private router: Router,
  ) {
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
