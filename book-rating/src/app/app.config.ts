import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { bookFeature, bookFeatureKey, reducer } from './books/store/book.reducer';
import { BookEffects } from './books/store/book.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // früher: HttpClientModule
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),

    // diese Dinge könnten auch in den Routen Routen des Features providet werden
    // provideState(bookFeatureKey, reducer),
    provideState(bookFeature),
    provideEffects(BookEffects)
]
};
