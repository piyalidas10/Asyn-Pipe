import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { catchError, map, retry, shareReplay, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public headers: HttpHeaders;
  public requestHeader: any;
  apiURL = '';

  constructor(
    private http: HttpClient
  ) { 
    this.apiURL = 'https://raw.githubusercontent.com/wedeploy-examples/supermarket-web-example/master/products.json';
  }

  setReqHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200/'
    });
    this.requestHeader = {
      headers: this.headers,
      responseType: 'json'
    };
  }

  getAllProducts(): Observable<any> {
    return this.http.get<Product[]>(this.apiURL, this.requestHeader)
    .pipe(
      map(res => res),
      shareReplay(), 
      catchError(this.handleError)
    );
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;  
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }
}
