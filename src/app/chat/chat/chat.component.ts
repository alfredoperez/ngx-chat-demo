import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BotFrameworkService } from '../../core/data/services/bot-framework.service';
import { Bot, Message } from '../../core/data/models/bot.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  bots: Bot[];
  activeBot: Bot;
  newMessage: string;
  messages$: Observable<any>;

  constructor(private botService: BotFrameworkService) {
  }

  ngOnInit() {
    this.bots = _.sortBy(this.getBots(), 'name');
    this.activeBot = this.bots[0];

    this.initializeConversation();
  }

  initializeConversation() {
    this.botService.initiateConversation(this.activeBot);
  }

  getBots(): Bot[] {
    return [
      {
        name: 'First Bot',
        picture: 'assets/img/avatars/13.png',
        apiKey: 'LobxRJN3qvA.cwA.Msw.FaBIzPuM5yUlkKjVJYDjBnLJfYQD74FBst_Aqmd-E5Q',
        messages: []
      } as Bot,
      {
        name: 'QnA Bot',
        picture: 'assets/img/avatars/2.png',
        apiKey: 'mfibrSyD9Rg.cwA.84g.5GNhdsXzIBD9OEjmjBFo76K2TFftBRH9qnqrvImGYIY', messages: []
      } as Bot

    ];
  }

  setActiveChat(target) {
    this.activeBot = target;
    this.initializeConversation();
  }

  send() {
    this.botService.postMessage(this.newMessage, this.activeBot)
      .subscribe(() => {
        this.newMessage = '';
        this.botService.getMessages(this.activeBot)
          .map(result => {
            this.activeBot.messages = [];
            _.each(result.messages, (msg: any) => {
              const item = new Message();
              item.when = moment(msg.created).format('LTS');
              item.message = msg.text;
              item.who = msg.from === 'ngx-demo-chat' ? 'me' : 'partner';
              this.activeBot.messages.push(item);
            });
          }).subscribe();
      });

  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }
}
