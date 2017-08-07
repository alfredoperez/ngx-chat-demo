import { Component, OnInit, ViewChild } from '@angular/core';
import { chatDemoData } from '../chat.demo';
import * as _ from 'lodash';
import * as moment from 'moment';
import { PerfectScrollbarComponent } from 'angular2-perfect-scrollbar';
import { DataContextService } from '../../core/data/services/datacontext.service';
import { BotFrameworkService } from '../../core/data/services/bot-framework.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  chats: any[];
  activeChat: any;
  newMessage: string;

  @ViewChild('chatScroll')
  private chatScroll: PerfectScrollbarComponent;

  constructor(private datacontext: DataContextService, private bot: BotFrameworkService) {
  }

  ngOnInit() {
    this.chats = _.sortBy(chatDemoData, 'lastMessageTime').reverse();
    this.activeChat = this.chats[0];
    setTimeout(() => {
      this.chatScroll.elementRef.nativeElement.scrollTop = this.chatScroll.elementRef.nativeElement.scrollHeight;
    }, 0);
    this.bot.initiateConversation();

  }

  setActiveChat(chat) {
    this.activeChat = chat;
  }

  send() {
    this.bot.postMessage(this.newMessage)
      .subscribe(console.log);

    // this.datacontext.bot.post(message)
    //   .subscribe(console.log);
    if ( this.newMessage ) {
      this.chats[0].messages.push({
        message: this.newMessage,
        when: moment(),
        who: 'me'
      });

      this.newMessage = '';
    }
  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }
}
