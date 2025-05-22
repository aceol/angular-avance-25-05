import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, AsyncPipe],
})
export class AlertComponent {
  protected alerts$ = inject(AlertService).alerts$;
}
