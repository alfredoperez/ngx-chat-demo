import { BaseEntity } from './base-entity.model';
import { Entity, EntityProperty } from '../decorators/entity.decorator';

export class BotEntity extends BaseEntity {
  type: string;
  requiresBotState: boolean;
  supportsTts: boolean;
  supportsListening: boolean;
}

@Entity('messages')
export class BotActivity extends BaseEntity {
  @EntityProperty(BotEntity)
  entities: BotEntity[];
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
}


