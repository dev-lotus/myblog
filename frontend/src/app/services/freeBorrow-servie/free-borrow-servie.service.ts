import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FreeBorrow } from 'src/app/interface/freeBorrow';

@Injectable({
  providedIn: 'root'
})
export class FreeBorrowServieService {
  private freeBorrow_api_url: string = "http://localhost:9000/user/listing/freeBorrow";

  constructor(private http: HttpClient) { }

  getAllFreeBorrowListing():Observable<FreeBorrow[]>{
    return this.http.get<FreeBorrow[]>(this.freeBorrow_api_url + "/get").pipe(catchError(this.errorHandler));
  }

  getFreeBorrowListingDataByUserToken(userToken:string): Observable<FreeBorrow[]>{
    return this.http.get<FreeBorrow[]>(this.freeBorrow_api_url + "/get/userToken/" + userToken).pipe(catchError(this.errorHandler));
  }
  
  getFreeBorrowListingDataById(listId: string, userToken:string ): Observable<FreeBorrow[]> {
    console.log(listId, userToken);
    return this.http.get<FreeBorrow[]>(this.freeBorrow_api_url + "/get/listingId/" + listId + "/"+userToken).pipe(catchError(this.errorHandler));
  }

  addFreeBorrowListingData(userToken:string, listingPicture:any[], title:string, description:string, lendingInfo:string,listFor:number, lng: number, lat: number): Observable<boolean> {
    return this.http.post<boolean>(this.freeBorrow_api_url + "/add/freeListing/", {
      userToken:userToken,
      picture:listingPicture,   
      title:title,
      description:description,
      lendingInfo:lendingInfo,
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
