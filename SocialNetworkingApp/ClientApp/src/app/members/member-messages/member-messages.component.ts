import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../_models/message";
import {MessageService} from "../../_services/message.service";
import {NgForm} from "@angular/forms";
import {AccountService} from "../../_services/account.service";
import {User} from "../../_models/user";
import {take} from "rxjs/operators";
import {Member} from "../../_models/member";
import {MembersService} from "../../_services/members.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit, OnDestroy {

  @ViewChild('messageForm', {static: true}) messageForm?: NgForm;

  @Input() username?: string;
  messages: Message[] = []
  messageContent = '';
  user?: User
  member: Member;
  constructor(public messageService: MessageService, private accountService: AccountService, private memberService: MembersService, private route: ActivatedRoute) {
    this.accountService.currentUser.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user
      }
    })
  }

  ngOnInit() {
    this.loadMember();
    this.messageService.createHubConnection(this.user, this.member.username)
    ///////////////////////////////////////////////////////////////////////this.loadMessages();
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
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
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    })
  }

  loadMember() {
    this.memberService
      .getMember(this.route.snapshot.paramMap.get("username"))
      .subscribe((member) => {
        this.member = member;
      });
  }

}
