import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { FreeListing } from 'src/app/interface/freeListing';

@Injectable({
  providedIn: 'root'
})
export class FreeListServiceService {
  private freeList_api_url: string = 'http://localhost:9000/user/listing';
 
  constructor(private http: HttpClient) { }

  getAllFreeListing(): Observable<FreeListing[]> {
    return this.http.get<FreeListing[]>(this.freeList_api_url + "/get/freeListing/").pipe(catchError(this.errorHandler));
  }

  getFreeListingDataByUserToken(userToken:string ): Observable<FreeListing[]> {
    return this.http.get<FreeListing[]>(this.freeList_api_url + "/get/freeListing/userToken/" +userToken).pipe(catchError(this.errorHandler));
  }

  getFreeListingDataById(listId: string, userToken:string ): Observable<FreeListing[]> {
    console.log(listId, userToken);
    return this.http.get<FreeListing[]>(this.freeList_api_url + "/get/freeListing/listingId/" + listId + "/"+userToken).pipe(catchError(this.errorHandler));
  }

  updateUserProfilePicture(listId: string, userToken:string, listingPicture:any[]): Observable<boolean> {
    return this.http.patch<boolean>(this.freeList_api_url + "/update/freeListingPicture/" + listId + "/"+userToken, {
      picture: listingPicture
    }).pipe(catchError(this.errorHandler));
  }

  updateFreeListingData(listId:string, userToken:string, listingPicture:any[], title:string, category:string, description:string, pickUpTime:string,listFor:number, lng: number, lat: number): Observable<boolean> {
    return this.http.put<boolean>(this.freeList_api_url + "/update/freeListing/" + listId + "/" + userToken, {
      picture:listingPicture,   
      title:title,
      category:category,
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
