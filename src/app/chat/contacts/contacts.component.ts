import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from '../chat.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() chats: Chat[];
  @Output() onActiveChanged = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  setActive(chat: Chat) {
    this.onActiveChanged.emit(chat);
  }
}
