// provideExperimentalZonelessChangeDetection was introduced as a public API in
// Angular 18. In Angular 17 the equivalent is the internal ɵprovideZonelessChangeDetection.
// eslint-disable-next-line @angular-eslint/no-internal-angular-apis
import { ApplicationConfig, ɵprovideZonelessChangeDetection } from '@angular/core';

// provideClientHydration() was removed alongside SSR/prerendering.
// It only exists to bridge the server-rendered HTML → client hydration gap.
// With CSR-only there is no server HTML to hydrate from, so it is not needed.
export const appConfig: ApplicationConfig = {
  providers: [
    ɵprovideZonelessChangeDetection(),
  ],
};
