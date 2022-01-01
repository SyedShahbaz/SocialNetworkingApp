import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AccountService } from "../_services/account.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  // Auth gurad automatically subscribes to the observable.
  // This will be callled when you try to navigate to some link.
  // currentUser will let us know if we have already a  user.
  // Incase we are not allowed to pass through. Tostr will display the message.

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser.pipe(
      map((user) => {
        if (user) return true;
        this.toastr.error("You cannot pass through!");
      })
    );
  }
}
