import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { User } from "../_models/user";
import { AccountService } from "../_services/account.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;

  model: any = {};
  // loggedIn: boolean = false;
  currentUser: Observable<User>;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.currentUser = this.accountService.currentUser;
    const user: any = JSON.parse(localStorage.getItem("user"));
    console.log("====> " + user);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl("/members");
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
