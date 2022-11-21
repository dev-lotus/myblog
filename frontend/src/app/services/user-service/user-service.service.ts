import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from 'src/app/interface/user';

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
  getUserDataById(userToken: string): Observable<User[]> {
    return this.http.get<User[]>(this.user_api_url + "/getUserDataById/" + userToken).pipe(catchError(this.errorHandler));
  }
  getMyLocation(userToken: string): Observable<any> {
    return this.http.get<any>(this.user_api_url + "/getMyLocation/" + userToken).pipe(catchError(this.errorHandler));
  }

  getHighestRewardPointMember():Observable<User[]> {
    return this.http.get<User[]>(this.user_api_url + "/getHighestRewardPointMember").pipe(catchError(this.errorHandler));
  }

  updateUserLocation(userToken: string, lng: number, lat: number): Observable<boolean> {
    return this.http.patch<boolean>(this.user_api_url + "/updateMyLocation/" + userToken, {
      lng: lng,
      lat: lat
    }).pipe(catchError(this.errorHandler));
  }
  
  updateUserProfilePicture(userToken: string, profilePicture: string): Observable<boolean> {
    return this.http.patch<boolean>(this.user_api_url + "/updateMyProfilePicture/" + userToken, {
      profilePicture: profilePicture
    }).pipe(catchError(this.errorHandler));
  }

  updateUserRewardPoints(userToken: string, rewardPoints: number): Observable<boolean> {
    return this.http.put<boolean>(this.user_api_url + "/updateRewardPoints/" + userToken, {
      rewardPoints: rewardPoints
    }).pipe(catchError(this.errorHandler));
  }

  updateUserData(userToken:string, firstName:string, lastName:string, mobileNumber:string, aboutYou:string, likes:any[], dislikes:any[]): Observable<boolean> {
    return this.http.put<boolean>(this.user_api_url + "/updateUserData/" + userToken, {
      firstName:firstName,   
      lastName:lastName ,     
      aboutYou:aboutYou,   
      mobileNumber:mobileNumber,  
      likes:likes,   
      dislikes:dislikes  
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
