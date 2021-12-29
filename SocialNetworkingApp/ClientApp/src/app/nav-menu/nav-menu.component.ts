import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
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

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.currentUser = this.accountService.currentUser;
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
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.accountService.logout();
  }
}
