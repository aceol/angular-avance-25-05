import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { WELCOME_MSG } from './shared/app.token';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideHttpClient(),
    {
      provide: WELCOME_MSG,
      useValue: 'Bienvenue sur Zenika Ecommerce',
    },
  ],
  declarations: [
    AppComponent,
    BasketComponent,
    CatalogComponent,
    FooterComponent,
    MenuComponent,
    ProductDetailsComponent,
    ProductComponent,
    AlertComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
