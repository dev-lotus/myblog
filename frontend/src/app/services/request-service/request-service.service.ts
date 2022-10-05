import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  private freeList_api_url: string = 'http://localhost:9000/user/request';

  constructor(private http: HttpClient) { }


  addRequestMessageData(listId: string, listedUserToken: string, requesterUserToken: string, request_message: string,acceptance_status:string): Observable<boolean> {
    return this.http.post<boolean>(this.freeList_api_url + "/add/newRequest", {
      listId: listId,
      listedUserToken: listedUserToken,
      requesterUserToken: requesterUserToken,
      request_message: request_message,
      acceptance_status: acceptance_status,


    }).pipe(catchError(this.errorHandler));

  }
    errorHandler(error: HttpErrorResponse) {
      console.error(error);
      return throwError(error.message || "Server Error");
    }
  }
  