import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../_models/user";
import {PresenceService} from "./presence.service";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  baseUrl = environment.apiUrl;

  // Special Observable. Kind of a buffer object
  // Stores the values here and emit when subscribed.
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private presenceService: PresenceService) {}

  login(model: any) {
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          // localStorage.setItem("user", JSON.stringify(user));
          // this.currentUserSource.next(user);
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    // Doing this we only return from the upper block.
    // We are not returning the user here.
    // Todo so return user from inside the map funtion.
    return this.http.post(this.baseUrl + "account/register", model).pipe(
      map((user: User) => {
        if (user) {
          // localStorage.setItem("user", JSON.stringify(user));
          // this.currentUserSource.next(user);
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user);
    this.presenceService.createHubConnection(user);
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }
}
