import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [	
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
