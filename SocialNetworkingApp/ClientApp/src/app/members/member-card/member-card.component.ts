import { Component, Input, OnInit } from "@angular/core";
import { Member } from "src/app/_models/member";
import {ToastrService} from "ngx-toastr";
import {MembersService} from "../../_services/members.service";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(private memberService: MembersService, private toastr: ToastrService) {}

  ngOnInit() {}

  addLike(member: Member){
    this.memberService.addLike(member.username).subscribe({
      next: () => this.toastr.success('You have liked ' + member.knownAs)
    });
  }
}
