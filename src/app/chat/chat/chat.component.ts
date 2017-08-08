import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BotFrameworkService } from '../../core/data/services/bot-framework.service';
import { Bot, Message } from '../../core/data/models/bot.model';
import { Observable } from 'rxjs/Observable';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { MdInputDirective } from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']

})
export class ChatComponent implements OnInit, AfterViewInit {

  bots: Bot[];
  activeBot: Bot;
  newMessage: string;
  isSendingMessage = false;
  @ViewChild(PerfectScrollbarComponent)
  componentScroll: PerfectScrollbarComponent;
  @ViewChild(MdInputDirective)
  input;
  messages$: Observable<any>;

  constructor(private botService: BotFrameworkService) {
  }

  ngOnInit() {
    this.bots = _.sortBy(this.getBots(), 'name');
    this.activeBot = this.bots[0];

    this.initializeConversation();
  }

  ngAfterViewInit() {
    //   this.input.focus();
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
    this.isSendingMessage = true;
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
            this.isSendingMessage = false;
            this.componentScroll.directiveRef.scrollToBottom();
            setTimeout(() => {
              this.input.focus();
            }, 30);
          }).subscribe();
      });

  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }
}
