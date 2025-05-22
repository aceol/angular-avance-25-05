import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private basketService = inject(BasketService);

  constructor() {
    // For now, we have an issue: the `numberOfBasketItems` property is not reactive!
    // The property is not updated when we add a product to the bakset or after checkout...
    this.basketService.fetch().subscribe();
  }

  get numberOfBasketItems$(): Observable<number> {
    return this.basketService.numberOfItems$;
  }
}
