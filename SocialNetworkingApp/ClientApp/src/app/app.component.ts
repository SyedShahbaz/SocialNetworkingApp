import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { VERSION } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "app";
  users: any;

  constructor(http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
    console.log(VERSION.full);
    http.get<any[]>(baseUrl + "api/users").subscribe(
      (result) => {
        console.log(result);
        this.users = result;
      },
      (error) => console.error(error)
    );
  }
}
