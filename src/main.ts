import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslations } from './app/services/provide.translation';
import { CustomTranslateService } from './app/services/translate.service';

const extendedAppConfig = {
  appConfig,
  providers: [
    appConfig.providers,
    provideHttpClient(),
    provideTranslations,
    CustomTranslateService
  ]
};

bootstrapApplication(AppComponent, extendedAppConfig)
  .catch(err => console.error(err));

