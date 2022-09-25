import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  private user_api_url: string = 'http://localhost:9000/user';
  constructor(private http: HttpClient) { }

  registerUser(firstName:string, lastName:string, emailAddress:string):Observable<any>{
    console.log(emailAddress);
    return this.http.post<boolean>(this.user_api_url+ "/addUser",{
      firstName:firstName,
      lastName:lastName,
      emailAddress:emailAddress
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
