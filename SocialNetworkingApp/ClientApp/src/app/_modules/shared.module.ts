import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
    }),
  ],
  exports: [ToastrModule],
})
export class SharedModule {}
