export class Message {
  message: string;
  when: string;
  who: string;
}

export class Bot {

  messages: Message[];
  apiKey: string;
  name: string;
  picture: string;
  lastMessageTime: string;
  lastMessage: string;

  constructor() {
  }
}
