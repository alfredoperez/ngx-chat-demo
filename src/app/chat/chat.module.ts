import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './contacts/contacts.component';
import { FormsModule } from '@angular/forms';
import { MdListModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const COMPONENTS = [
  ChatComponent,
  ContactsComponent
];

const ROUTES: Routes = [
  {
    path: '',
    component: ChatComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdListModule,
    SharedModule,
    PerfectScrollbarModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [...COMPONENTS]
})
export class ChatModule {
}
