import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from './chatMessageDto';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public webSocketService: WebsocketService) {}

  ngOnInit(): void {
    this.webSocketService.openWebsocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebsocket();
  }

  sendMessage(sendForm: NgForm) {}

  onEnter() {
    const chatMessageDto = new ChatMessageDto('', this.message);
    this.webSocketService.sendMessage(chatMessageDto);
    this.message = '';
  }

  messages = ['Hallo', 'du', 'da', 'oida', 'wos', 'is', 'mit', 'dir'];
  title = 'whatsapp';
  message = '';
}
