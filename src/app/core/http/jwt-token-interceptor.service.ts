import { Injectable } from '@angular/core';
import { 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpInterceptor, 
  HttpResponse 
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { SpinnerService } from 'app/services/api/spinner.service';


@Injectable({
  providedIn: 'root'
})
export class JwtTokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private spinner: SpinnerService ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getIdentity();
    //const token = this.authService.getToken();
    if ( currentUser ) {
      req = req.clone( {
        setHeaders: {
          //Authorization: `Bearer ${token}`,
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
        }
      });
    }

    // Spinner
    this.spinner.show();

    return next.handle(req)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.spinner.hide();
            }
          }, (error) => {
            this.spinner.hide();
          }
        )
      );
  }
}
