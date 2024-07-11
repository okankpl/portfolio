import { Routes } from '@angular/router';
import { ImprintComponent } from './legals/imprint/imprint.component';
import { PrivacypolicyComponent } from './legals/privacypolicy/privacypolicy.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacypolicy', component: PrivacypolicyComponent },
    { path: 'index', component: AppComponent }
];