import { BaseEntity } from './base-entity.model';
import { Entity, EntityProperty } from '../decorators/entity.decorator';

export class BotInfo extends BaseEntity {
  type: string;
  requiresBotState: boolean;
  supportsTts: boolean;
  supportsListening: boolean;
}

@Entity('messages')
export class BotActivity extends BaseEntity {
  @EntityProperty(BotInfo)
  entities: BotInfo[];
  type: string;
  text: string;
  from: any;
  locale: string;
  textFormat: string;
  timestamp: Date;
  channelData: any;
  channelId: string;
  localTimestamp: Date;
  recipient: any;
  conversation: any;
  serviceUrl: string;
  static fromMessage(message: string): BotActivity {
    const activity = new BotActivity();
    activity.type = 'message';
    activity.text = message;
    activity.from = 'ngx-demo-chat';
    return activity;
  }
}


