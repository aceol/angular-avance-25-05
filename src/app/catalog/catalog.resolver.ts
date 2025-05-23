import { inject } from '@angular/core';
import { catchError, EMPTY, zip } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';

export const catalogResolver = () => {
  const alertService = inject(AlertService);
  const catalogService = inject(CatalogService);
  const basketService = inject(BasketService);
  return zip([catalogService.fetch(), basketService.fetch()]).pipe(
    catchError(() => {
      console.log('should alert');
      alertService.addDanger("😲 Désolé, impossible d'accéder au catalogue.");
      return EMPTY;
    }),
  );
};
