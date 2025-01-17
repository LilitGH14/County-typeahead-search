import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GlobalService } from '../../service/global.service';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
  constructor(private globalService: GlobalService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.globalService.show();

    const clonedRequest = req.clone({
      setHeaders: {
        'Content-type': 'application/json',
        'Access-control-allow-origin': '*',
      },
    });

    return next.handle(clonedRequest).pipe(
      finalize(() => {
        this.globalService.hide();
      }),
      catchError((error: HttpErrorResponse) => {
        this.globalService.setError(error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
