import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { VERSION } from "@angular/core";
import { User } from "./_models/user";
import { AccountService } from "./_services/account.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "app";
  users: any;

  constructor(
    private accountService: AccountService,
    http: HttpClient,
    @Inject("BASE_URL") baseUrl: string
  ) {
    console.log(VERSION.full);
    // http.get<any[]>(baseUrl + "api/users").subscribe(
    //   (result) => {
    //     console.log(result);
    //     this.users = result;
    //   },
    //   (error) => console.error(error)
    // );
  }
  ngOnInit(): void {
    console.log("Calling from app");
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem("user"));
    this.accountService.setCurrentUser(user);
  }
}
