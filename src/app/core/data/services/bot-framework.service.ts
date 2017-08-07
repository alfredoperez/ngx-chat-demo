import { BotActivity } from '../models/bot-activity.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Bot } from '../models/bot.model';

@Injectable()
export class BotFrameworkService {
  private session: any;

  constructor(private http: HttpClient) {
  }

  initiateConversation(bot: Bot) {
    const options = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + bot.apiKey)
    };

    const url = 'https://directline.botframework.com/api/conversations';
    this.http.post(url, {}, options)
      .subscribe(res => {
        this.session = res;
      });
  }

  postMessage(message: string, bot: Bot): Observable<any> {

    const options = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + bot.apiKey)
    };
    const activity = BotActivity.fromMessage(message);
    const url = 'https://directline.botframework.com/api/conversations/' + this.session.conversationId + '/messages';

    return this.http.post(url, activity, options);
  }

  getMessages(bot: Bot): Observable<any> {

    const options = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + bot.apiKey)
    };
    const url = 'https://directline.botframework.com/api/conversations/' + this.session.conversationId + '/messages';
    return this.http.get(url, options);

  }
}
