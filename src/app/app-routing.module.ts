import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'chat',
    loadChildren: 'app/chat/chat.module#ChatModule'
  },

];

export const routing = RouterModule.forRoot(routes);
