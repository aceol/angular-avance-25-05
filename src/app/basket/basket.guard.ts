import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs';
import { BasketService } from './basket.service';

export const basketGuard: CanMatchFn = () => {
  return inject(BasketService).numberOfItems$.pipe(map(Boolean));
};
