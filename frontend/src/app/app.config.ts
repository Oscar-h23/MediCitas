import {ApplicationConfig,provideZoneChangeDetection,LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { routes } from './app.routes';

// Registrar idioma/configuración peruana
registerLocaleData(localeEsPe);


export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(routes),

    provideHttpClient(),

    // Locale Perú
    {
      provide: LOCALE_ID,
      useValue: 'es-PE'
    }

  ]
};