import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private user_api_url: string = 'http://localhost:9000/user';
  constructor(private http: HttpClient) { }

  registerUser(firstName: string, lastName: string, emailAddress: string): Observable<any> {
    console.log(emailAddress);
    return this.http.post<boolean>(this.user_api_url + "/addUser", {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress
    }).pipe(catchError(this.errorHandler));
  }
  getMyLocation(userToken: string): Observable<any> {
    return this.http.get<any>(this.user_api_url + "/getMyLocation/" + userToken).pipe(catchError(this.errorHandler));
  }
  updateUserLocation(userToken: string, lng: number, lat: number): Observable<boolean> {
    return this.http.patch<boolean>(this.user_api_url + "/updateMyLocation/" + userToken, {
      lng: lng,
      lat: lat
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
