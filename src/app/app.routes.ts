import { Routes } from '@angular/router';
import { ImprintComponent } from './legals/imprint/imprint.component';
import { PrivacypolicyComponent } from './legals/privacypolicy/privacypolicy.component';
import { MaincontentComponent } from './maincontent/maincontent.component';

export const routes: Routes = [
    { path: '', component: MaincontentComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacypolicy', component: PrivacypolicyComponent}
    
];