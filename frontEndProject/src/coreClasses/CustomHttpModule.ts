import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomHttpModule extends Http {

  constructor (backend: XHRBackend, options: RequestOptions, router: Router) {
    const token = localStorage.getItem('access_token');
    options.headers.set('access_token', `${token}`);
    super(backend, options);
    this.router = router;
  }
  router: Router;
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = localStorage.getItem('access_token');
    if (typeof url === 'string') {
      if (!options) {

        options = {headers: new Headers()};
      }
      options.headers.set('access_token', `${token}`);
    } else {
      url.headers.set('access_token', `${token}`);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: CustomHttpModule) {
    return (res: Response) => {
      switch (res.status) {
        case 401:
        break;
        case 403:
        break;
        case 404:
        break;
        default:
        break;
      }
      return Observable.throw(res);
    };
  }
}
