import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  // Here we can intercept the request that goes out or the response that comes back in. Next has the response
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              } else {
                this.toastr.error(error.statusText, error.status);
              }
              break;

            case 401:
              this.toastr.error(error.statusText, error.status);
              break;

            case 404:
              this.router.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl("/server-error", navigationExtras);
              break;
            default:
              this.toastr.error("Something unexpected went wrong");
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
