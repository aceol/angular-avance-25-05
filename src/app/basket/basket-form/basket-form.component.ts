import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { Customer } from '../../customer/customer.types';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket-form',
  imports: [ReactiveFormsModule],
  templateUrl: './basket-form.component.html',
  styleUrl: './basket-form.component.scss',
})
export class BasketFormComponent {
  protected customer: Customer = { name: '', address: '', creditCard: '' };
  private basketService = inject(BasketService);
  private formBuilder = inject(FormBuilder);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private alertService = inject(AlertService);

  protected formGroup = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', [Validators.required]),
    address: this.formBuilder.nonNullable.control('', [Validators.required]),
    creditCard: this.formBuilder.nonNullable.control('', [Validators.required, Validators.pattern(/^\d{3}-\d{3}$/)]),
  });

  constructor(private router: Router) {}

  protected checkout() {
    console.log('checkout');
    this.formGroup.disable();

    this.basketService.checkout(this.formGroup.value as Customer).subscribe({
      next: ({ orderNumber }) => {
        this.alertService.addSuccess(`🚀 Merci pour votre commande (réf. ${orderNumber}).`);
        this.router.navigate(['']);
      },
      error: () => {
        this.alertService.addDanger("😱 Désolé, une erreur s'est produite.");
        this.formGroup.enable();
        this.changeDetectorRef.markForCheck();
      },
    });
  }
}
