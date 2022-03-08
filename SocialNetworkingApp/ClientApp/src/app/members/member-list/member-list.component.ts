import { Component, OnInit } from "@angular/core";
import { Member } from "src/app/_models/member";
import { MembersService } from "src/app/_services/members.service";
import { CommonModule } from "@angular/common";
import { Pagination } from "src/app/_models/pagination";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  members: Member[] = new Array<Member>();
  pagination: Pagination
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private memberService: MembersService) {}

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    this.loading = true;
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe((res) => {
      this.members = res.result;
      this.pagination = res.pagination
      this.loading = false;
    });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMember();
  }
}
