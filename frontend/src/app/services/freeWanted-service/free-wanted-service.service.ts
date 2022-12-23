import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { FreeWanted } from 'src/app/interface/freeWanted';

@Injectable({
  providedIn: 'root'
})
export class FreeWantedServiceService {

  private freeWanted_api_url: string = "http://localhost:9000/user/listing/freeWanted";

  // private freeWanted_api_url: string = 'https://cerulean-piranha-tie.cyclic.app/user/listing/freeWanted';
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

  getAllFreeWantedNearBy(lng: number, lat: number): Observable<FreeWanted[]> {
    return this.http.get<FreeWanted[]>(this.freeWanted_api_url + "/get/listings/nearBy/"  + lng + "/"+lat).pipe(catchError(this.errorHandler));
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

  
  updateListingPicture(listId: string, userToken:string, listingPicture:any[]): Observable<boolean> {
    return this.http.patch<boolean>(this.freeWanted_api_url + "/update/freeWantedPicture/" + listId  + "/"+userToken, {
      picture: listingPicture
    }).pipe(catchError(this.errorHandler));
  }

  updateAddLikeFreeWanted(listId: string, userToken:string): Observable<boolean> {
    return this.http.patch<boolean>(this.freeWanted_api_url + "/update/addLike/" + listId ,{
      userToken:userToken, 
    }).pipe(catchError(this.errorHandler));
  }

  updateFreeWantedData(listId:string, userToken:string, listingPicture:any[], title:string, description:string, pickUpTime:string,listFor:number, lng: number, lat: number): Observable<boolean> {
    return this.http.put<boolean>(this.freeWanted_api_url + "/update/" + listId + "/" + userToken, {
      picture:listingPicture,   
      title:title,
      description:description,
      pickUpTime:pickUpTime,
      listFor:listFor,
      lng: lng,
      lat: lat
    
    }).pipe(catchError(this.errorHandler));
  }
  updateDisableStatusFreeWanted(listId: string, userToken:string, disableStatus:boolean): Observable<boolean> {
    return this.http.patch<boolean>(this.freeWanted_api_url + "/update/disableStatus/" + listId + "/"+userToken,{
      disableStatus:disableStatus, 
    }).pipe(catchError(this.errorHandler));
  }
  updateRemoveLikeFreeWanted(listId: string, userToken:string): Observable<boolean> {
    return this.http.patch<boolean>(this.freeWanted_api_url + "/update/removeLike/" + listId ,{
      userToken:userToken, 
    }).pipe(catchError(this.errorHandler));
  }
  
  updateOnHoldStatus(listId: string, onHoldStatus:boolean): Observable<boolean> {
    return this.http.patch<boolean>(this.freeWanted_api_url + "/update/onHoldListing/" + listId ,{
      onHold:onHoldStatus
    }).pipe(catchError(this.errorHandler));
  }

  deleteFreeWanted(listId:string, userToken:string):Observable<boolean>{
    return this.http.delete<boolean>(this.freeWanted_api_url + "/delete/" + listId + "/" + userToken).pipe(catchError(this.errorHandler));
  }
  


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
