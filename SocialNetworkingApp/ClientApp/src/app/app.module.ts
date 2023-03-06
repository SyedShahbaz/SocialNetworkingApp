import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from "./register/register.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { AuthGuard } from "./_guards/auth.guard";
import { TestErrorsComponent } from "./errors/test-errors/test-errors.component";
import { ErrorInterceptor } from "./_interceptors/error.interceptor";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { ServerErrorComponent } from "./errors/server-error/server-error.component";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { JwtInterceptor } from "./_interceptors/jwt.interceptor";

import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxGalleryModule } from "@kolkov/ngx-gallery";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { PreventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";
import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";

import { FileUploadModule } from 'ng2-file-upload'
import { TextInputComponent } from "./_forms/text-input/text-input.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { DateInputComponent } from "./_forms/date-input/date-input.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TimeagoModule} from "ngx-timeago";
import { MemberMessagesComponent } from "./members/member-messages/member-messages.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    ServerErrorComponent,
    TestErrorsComponent,
    MemberListComponent,
    NotFoundComponent,
    MemberDetailComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    TabsModule.forRoot(),
    MatMenuModule,
    MatIconModule,
    NgxGalleryModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatProgressSpinnerModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
    }),
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
      {
        path: "",
        runGuardsAndResolvers: "always",
        canActivate: [AuthGuard],
        children: [
          { path: "members", component: MemberListComponent },
          { path: "members/:username", component: MemberDetailComponent },
          { path: "member/edit", component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
          { path: "lists", component: ListsComponent },
          { path: "messages", component: MessagesComponent },
        ],
      },
      { path: "errors", component: TestErrorsComponent },
      { path: "not-found", component: NotFoundComponent },
      { path: "server-error", component: ServerErrorComponent },
      { path: "**", component: HomeComponent, pathMatch: "full" },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
