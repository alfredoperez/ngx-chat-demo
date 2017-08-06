import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceFactory } from './services/data-service.factory';
import { DataContextService } from './services/datacontext.service';
import { BaseDataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { BotFrameworkService } from './services/bot-framework.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  declarations: [],
  providers: [
    DataContextService,
    BaseDataService,
    DataServiceFactory,
    BotFrameworkService
  ],
})
export class DataModule {
}
