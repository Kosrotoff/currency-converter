import {Routes} from '@angular/router';

import {MasterPage} from './pages/master';
import {NotFoundComponent} from './components/not-found';


export const routes: Routes = [
    {
        path: '',
        component: MasterPage,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/routes/public/module').then(m => m.PublicModule)
            },
            {
                path: '',
                loadChildren: () =>
                    import('./pages/routes/secure/module').then(m => m.SecureModule)
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];