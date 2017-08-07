import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BotFrameworkService {
  private botFrameworkDirectLineApiKey: string;
  private session: any;

  constructor(private http: HttpClient) {
    this.botFrameworkDirectLineApiKey = 'LobxRJN3qvA.cwA.Msw.FaBIzPuM5yUlkKjVJYDjBnLJfYQD74FBst_Aqmd-E5Q';
  }

  initiateConversation() {

    if ( !this.session ) {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.botFrameworkDirectLineApiKey);


      this.http.post('https://directline.botframework.com/api/conversations',
        {}, {headers: headers})
        .subscribe(res => {
          this.session = res;
        });
    }
  }

  postMessage(message: string): Observable<any> {

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.botFrameworkDirectLineApiKey);

    return this.http.post('https://directline.botframework.com/api/conversations/' + this.session.conversationId + '/messages',
      JSON.stringify({text: message}), {headers: headers})


  }

  getMessages() {

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.botFrameworkDirectLineApiKey);

    this.http.get('https://directline.botframework.com/api/conversations/' + this.session.conversationId + '/messages',
      {headers: headers})

  }
}
