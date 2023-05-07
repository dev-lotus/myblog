import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FreeBorrow } from 'src/app/interface/freeBorrow';

@Injectable({
  providedIn: 'root'
})
export class FreeBorrowServieService {
  // private freeBorrow_api_url: string = "http://localhost:9000/user/listing/freeBorrow";
  private freeBorrow_api_url: string = "https://share-and-care-mbr4veogx-l0tus-biswas.vercel.app/user/listing/freeBorrow";

  constructor(private http: HttpClient) { }

  getAllFreeBorrowListing():Observable<FreeBorrow[]>{
    return this.http.get<FreeBorrow[]>(this.freeBorrow_api_url + "/get/all").pipe(catchError(this.errorHandler));
  }

  getFreeBorrowListingDataByUserToken(userToken:string): Observable<FreeBorrow[]>{
    return this.http.get<FreeBorrow[]>(this.freeBorrow_api_url + "/get/userToken/" + userToken).pipe(catchError(this.errorHandler));
  }
  
  getFreeBorrowListingDataById(listId: string, userToken:string ): Observable<FreeBorrow[]> {
    console.log(listId, userToken);
    return this.http.get<FreeBorrow[]>(this.freeBorrow_api_url + "/get/listingId/" + listId + "/"+userToken).pipe(catchError(this.errorHandler));
  }

  getAllFreeBorrowNearBy(lng: number, lat: number): Observable<FreeBorrow[]> {
    return this.http.get<FreeBorrow[]>(this.freeBorrow_api_url + "/get/listings/nearBy/"  + lng + "/"+lat).pipe(catchError(this.errorHandler));
  }

  addFreeBorrowListingData(userToken:string, listingPicture:any[], title:string, description:string, lendingInfo:string,listFor:number, lng: number, lat: number): Observable<boolean> {
    return this.http.post<boolean>(this.freeBorrow_api_url + "/add/", {
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

  updateListingPicture(listId: string, userToken:string, listingPicture:any[]): Observable<boolean> {
    return this.http.patch<boolean>(this.freeBorrow_api_url + "/update/freeBorrowPicture/" + listId  + "/"+userToken, {
      picture: listingPicture
    }).pipe(catchError(this.errorHandler));
  }

  updateAddLikeFreeBorrow(listId: string, userToken:string): Observable<boolean> {
    return this.http.patch<boolean>(this.freeBorrow_api_url + "/update/addLike/" + listId ,{
      userToken:userToken, 
    }).pipe(catchError(this.errorHandler));
  }

  updateDisableStatusFreeBorrow(listId: string, userToken:string, disableStatus:boolean): Observable<boolean> {
    return this.http.patch<boolean>(this.freeBorrow_api_url + "/update/disableStatus/" + listId + "/"+userToken,{
      disableStatus:disableStatus, 
    }).pipe(catchError(this.errorHandler));
  }
  updateRemoveLikeFreeBorrow(listId: string, userToken:string): Observable<boolean> {
    return this.http.patch<boolean>(this.freeBorrow_api_url + "/update/removeLike/" + listId ,{
      userToken:userToken, 
    }).pipe(catchError(this.errorHandler));
  }

  updateFreeBorrowData(listId:string, userToken:string, listingPicture:any[], title:string, description:string, lendingInfo:string,listFor:number, lng: number, lat: number): Observable<boolean> {
    return this.http.put<boolean>(this.freeBorrow_api_url + "/update/" + listId + "/" + userToken, {
      picture:listingPicture,   
      title:title,
      description:description,
      lendingInfo:lendingInfo,
      listFor:listFor,
      lng: lng,
      lat: lat
    
    }).pipe(catchError(this.errorHandler));
  }

  updateOnHoldStatus(listId: string, onHoldStatus:boolean): Observable<boolean> {
    return this.http.patch<boolean>(this.freeBorrow_api_url + "/update/onHoldListing/" + listId ,{
      onHold:onHoldStatus
    }).pipe(catchError(this.errorHandler));
  }

  deleteFreeBorrow(listId:string, userToken:string):Observable<boolean>{
    return this.http.delete<boolean>(this.freeBorrow_api_url + "/delete/" + listId + "/" + userToken).pipe(catchError(this.errorHandler));
  }
  

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
