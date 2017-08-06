import { Injectable } from '@angular/core';
import { DataServiceFactory } from './data-service.factory';
import { BotActivity } from '../models/bot-activity.model';

@Injectable()
export class DataContextService {
  bot;

  constructor(private serviceFactory: DataServiceFactory) {
    this.bot = serviceFactory.create(new BotActivity());
  }
}
