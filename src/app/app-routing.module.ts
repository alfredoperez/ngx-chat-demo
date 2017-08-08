import { Routes, RouterModule } from '@angular/router';
import { EmbeddedComponent } from './embedded/embedded.component';

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
  {
    path: 'embedded',
    component:EmbeddedComponent

  },

];

export const routing = RouterModule.forRoot(routes);
