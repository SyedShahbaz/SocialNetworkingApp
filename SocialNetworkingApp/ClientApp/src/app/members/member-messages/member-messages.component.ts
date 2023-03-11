import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../_models/message";
import {MessageService} from "../../_services/message.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm', {static: true}) messageForm?: NgForm;

  @Input() username?: string;
  messages: Message[] = []
  messageContent = '';
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    if(this.username){
      this.messageService.getMessageThread(this.username).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

  sendMessage() {
    if (!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        this.messages.push(message)
        this.messageForm.reset()
      }
    })
  }


}
