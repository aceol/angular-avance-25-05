import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoute } from './app/app.route';

const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(appRoute, withComponentInputBinding()),
    provideHttpClient(),
  ],
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
