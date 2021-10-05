import { Anime, APIResponse } from './../model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public anyError: any;
  private base_url = "https://api.jikan.moe/v3";//https://api.jikan.moe/v3/anime/1

  constructor(private http: HttpClient) { }

  getSearchAnimeList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Anime>> {
    let params = new HttpParams().set('ordering', ordering);
    console.log(params, 'parms')

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Anime>>(`${this.base_url}/search/anime?q=${ordering}&order_by=title&sort=asc`, {
      params: params,
    }).pipe(
      catchError(this.handleError)
    );
  }

  getSearchAnime(
    ordering: string
  ): Observable<APIResponse<Anime>> {
  
    return this.http.get<APIResponse<Anime>>(`${this.base_url}/search/anime?q=${ordering}&order_by=title&sort=asc`).pipe(
      catchError(this.handleError)
    );
  }

  getAnimeList(num: number
  ): Observable<APIResponse<Anime>> {
    
    return this.http.get<APIResponse<Anime>>(`${this.base_url}/anime/`+num).pipe(
      catchError(this.handleError)
    );
  }

  getTopAnime(): Observable<Anime> {
    return this.http.get<Anime>(`${this.base_url}/top/anime/1/bypopularity`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    this.anyError = error.status
    console.log(this.anyError, 'status_code')
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

