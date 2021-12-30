import { Component, OnInit } from '@angular/core';

import { MessageDto } from '../Dto/MessageDto';

import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });
  }

  send(): void {
    if(this.msgDto) {
      if(this.msgDto.user.length == 0 || this.msgDto.msgText.length == 0) {
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);
        this.msgDto.msgText = '';
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);
  }
}