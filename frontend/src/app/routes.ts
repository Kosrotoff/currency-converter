import {Routes} from '@angular/router';

import {MasterLayout} from './pages/layouts/master';
import {NotFoundLayout} from './pages/layouts/not-found';


export const routes: Routes = [
    {
        path: '',
        component: MasterLayout,
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
        component: NotFoundLayout
    }
];
