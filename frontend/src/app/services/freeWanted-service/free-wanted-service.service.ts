import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FreeWanted } from 'src/app/interface/freeWanted';

@Injectable({
  providedIn: 'root'
})
export class FreeWantedServiceService {

  private freeWanted_api_url: string = "http://localhost:9000/user/listing/freeWanted";
  constructor(private http:HttpClient) { }

  
  getAllFreeWantedListing():Observable<FreeWanted[]>{
    return this.http.get<FreeWanted[]>(this.freeWanted_api_url + "/get/all").pipe(catchError(this.errorHandler));
  }

  getFreeWantedListingDataByUserToken(userToken:string): Observable<FreeWanted[]>{
    return this.http.get<FreeWanted[]>(this.freeWanted_api_url + "/get/userToken/" + userToken).pipe(catchError(this.errorHandler));
  }
  
  getFreeWantedListingDataById(listId: string, userToken:string ): Observable<FreeWanted[]> {
    console.log(listId, userToken);
    return this.http.get<FreeWanted[]>(this.freeWanted_api_url + "/get/listingId/" + listId + "/"+userToken).pipe(catchError(this.errorHandler));
  }

  addFreeWantedListingData(userToken:string, listingPicture:any[], title:string, description:string, pickUpTime:string,listFor:number, lng: number, lat: number): Observable<boolean> {
    return this.http.post<boolean>(this.freeWanted_api_url + "/add/", {
      userToken:userToken,
      picture:listingPicture,   
      title:title,
      description:description,
      pickUpTime:pickUpTime,
      listFor:listFor,
      lng:lng,
      lat:lat
    
    }).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
