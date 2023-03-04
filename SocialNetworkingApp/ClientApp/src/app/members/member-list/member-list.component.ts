import { Component, OnInit } from "@angular/core";
import { Member } from "src/app/_models/member";
import { MembersService } from "src/app/_services/members.service";
import { CommonModule } from "@angular/common";
import { Pagination } from "src/app/_models/pagination";
import { UserParams } from "src/app/_models/userParams";
import { AccountService } from "src/app/_services/account.service";
import { take } from "rxjs/operators";
import { User } from "src/app/_models/user";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  members: Member[] = new Array<Member>();
  pagination: Pagination
  userParams: UserParams;
  loading = false;
  user: User

  genderList = [{value: "male", display: "Males"}, {value: "female", display: "Females"}]


  constructor(private memberService: MembersService, private accountService: AccountService) {
    /*this.accountService.currentUser.pipe(take(1)).subscribe(user => {
      this.user = user
      this.userParams = new UserParams(user);
    })*/
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.loading = true;
      this.memberService.getMembers(this.userParams).subscribe((res) => {
        this.members = res.result;
        this.pagination = res.pagination
        this.loading = false;
      });
    }

  }

  resetFilter() {
      this.userParams = this.memberService.resetUserParams();
      this.loadMember();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMember();
  }
}
