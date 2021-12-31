import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AccountService } from "../_services/account.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegsiter = new EventEmitter<boolean>();

  model: any = {};

  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  register() {
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.cancel();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancel() {
    console.log("Called");
    this.cancelRegsiter.emit(false);
  }
}
