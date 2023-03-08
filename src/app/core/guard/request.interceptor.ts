import Swal from "sweetalert2";
import { UserService } from './../services/user.service';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService
    ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.userService.userIsLoged()) {
      req = req.clone({
        setHeaders: {},
      });
    }

    if (req.headers.get('skipValidationError') === 'true') {
      return next.handle(req);
    }

    return next.handle(req).pipe(tap((httpEvent) => httpEvent, (err: HttpErrorResponse) => {
      const handler = this.statusCodeHandler[err.status];
      if (handler) {
        return handler('A algo de errado revise e tente novamente');
      }

      if(err.error.message.indexOf('FOREIGN KEY') > -1){
        this.warningHandler('Não é possivel excluir pois está ligada a uma nota fiscal ou despesa');
        return;
      }
      this.internalServerErrorHandler('Algo deu errado entre em contato com Adiministrador');
    }));
  }

  private readonly statusCodeHandler: any = {
    [HttpStatusCode.NotFound]: this.warningHandler,
    [HttpStatusCode.BadRequest]: this.warningHandler,
    [HttpStatusCode.Unauthorized]: this.unauthorizedHandler
  };

  warningHandler(message: string) {
    Swal.fire({
      title: "Aviso",
      text: message,
      icon: "warning",
    });
  }

  internalServerErrorHandler(message: string) {
    Swal.fire({
      title: "Ops, algo deu errado!",
      text: message,
      icon: "error",
    });
  }

  unauthorizedHandler(router: Router) {
    localStorage.clear();
    return router.navigate(['/login']);
  }
}
