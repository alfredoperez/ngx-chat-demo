import { Component, OnInit, ViewChild } from '@angular/core';
import { chatDemoData } from '../chat.demo';
import * as _ from 'lodash';
import * as moment from 'moment';
import { PerfectScrollbarComponent } from 'angular2-perfect-scrollbar';
import { DataContextService } from '../../core/data/services/datacontext.service';

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

  constructor(private datacontext: DataContextService) {
  }

  ngOnInit() {
    this.chats = _.sortBy(chatDemoData, 'lastMessageTime').reverse();
    this.activeChat = this.chats[0];
    setTimeout(() => {
      this.chatScroll.elementRef.nativeElement.scrollTop = this.chatScroll.elementRef.nativeElement.scrollHeight;
    }, 0);

  }

  setActiveChat(chat) {
    this.activeChat = chat;
  }

  send() {
    var message = {
      'type': 'message',
      'text': 'test',
      'from': {
        'id': 'default-user',
        'name': 'User'
      },
      'locale': 'en-US',
      'textFormat': 'plain',
      'timestamp': '2017-08-06T17:02:14.349Z',
      'channelData': {
        'clientActivityId': '1502038929891.8405857785802144.0'
      },
      'entities': [
        {
          'type': 'ClientCapabilities',
          'requiresBotState': true,
          'supportsTts': true,
          'supportsListening': true
        }
      ],
      'id': 'l04hnn8m2lmd',
      'channelId': 'emulator',
      'localTimestamp': '2017-08-06T12:02:14-05:00',
      'recipient': {
        'id': '1bec005f03e9l',
        'name': 'Bot'
      },
      'conversation': {
        'id': '8kf9bgm4hbmj'
      },
      'serviceUrl': 'http://localhost:51714'
    };
    this.datacontext.bot.post(message)
      .subscribe(console.log);
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
