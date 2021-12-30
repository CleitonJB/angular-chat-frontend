import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MessageDto } from '../Dto/MessageDto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mensagens = [
    {
      id:        1,
      from: {
        id:   1,
        name: 'CT',
      },
      to: {
        id:   2,
        name: 'TR',
      },
      message:   "I'm at B"
    },
    {
      id:        2,
      from: {
        id:   2,
        name: 'TR',
      },
      to: {
        id:   1,
        name: 'CT',
      },
      message:   "Negative!"
    },
    {
      id:        3,
      from: {
        id:   1,
        name: 'CT',
      },
      to: {
        id:   2,
        name: 'TR',
      },
      message:   "Knife mid?"
    },
    {
      id:        4,
      from: {
        id:   2,
        name: 'TR',
      },
      to: {
        id:   1,
        name: 'CT',
      },
      message:   'Roger that!'
    },
  ];

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