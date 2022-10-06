import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Request } from 'src/app/interface/request';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  private request_api_url: string = 'http://localhost:9000/user/request';

  constructor(private http: HttpClient) { }


  addRequestMessageData(listId: string, listedUserToken: string, requesterUserToken: string, request_message: string,acceptance_status:string): Observable<boolean> {
    return this.http.post<boolean>(this.request_api_url + "/add/newRequest", {
      listId: listId,
      listedUserToken: listedUserToken,
      requesterUserToken: requesterUserToken,
      request_message: request_message,
      acceptance_status: acceptance_status,


    }).pipe(catchError(this.errorHandler));

  }

  getAllRequestByTokens(token1: string): Observable<Request[]> {
    return this.http.get<Request[]>(this.request_api_url + "/get/allRequest/requested/token/" + token1).pipe(catchError(this.errorHandler));
  }

  getAllRequestByTokensReceivedRequest(token1: string): Observable<Request[]> {
    return this.http.get<Request[]>(this.request_api_url + "/get/allRequest/received_request/token/" + token1).pipe(catchError(this.errorHandler));
  }
    errorHandler(error: HttpErrorResponse) {
      console.error(error);
      return throwError(error.message || "Server Error");
    }
  }
  