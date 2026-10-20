import { Routes } from '@angular/router';
import { ImprintComponent } from './legals/imprint/imprint.component';
import { MaincontentComponent } from './maincontent/maincontent.component';

export const routes: Routes = [
    { path: '', component: MaincontentComponent },
    { path: 'imprint', component: ImprintComponent },
    // Lazy-loaded: the long legal text would otherwise enlarge the start page bundle.
    { path: 'privacypolicy', loadComponent: () => import('./legals/privacypolicy/privacypolicy.component').then(m => m.PrivacypolicyComponent) },
    { path: '**', redirectTo: '' }
];