import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { ChatMessageDto } from './chatMessageDto';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  webSocket: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor() {}

  public openWebsocket() {
    this.webSocket = new WebSocket('wss://echo.websocket.org');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('closed', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebsocket() {
    this.webSocket.close();
  }
}
