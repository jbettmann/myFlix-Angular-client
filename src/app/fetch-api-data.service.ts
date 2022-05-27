import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://jordansmyflix.herokuapp.com/';
// Gets token from localStorage
const token = localStorage.getItem('token');
// Gets username from localStorage for endpoints
const username = localStorage.getItem('user');

// Injectable Decorator
//  A decorator is a function that augments a piece of code (usually another function or a class).
// Tells Angular that this service will be available everywhere (hence the root)
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  // Injects HttpClient into class
  constructor(private http: HttpClient) {}

  /*
   * calls API endpoint for new user registration
   * @param userDetails
   * @returns new  user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /*
   * calls API endpoint for login to allow existing user to login
   * @param userDetails
   * @returns user data in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /*
   * calls API endpoint for all movies
   * @returns array of all movies in JSON format
   */
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint for single movies by title
   * @parms title
   * @returns data about single movies in JSON format
   */
  getSingleMovies(title: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint for director by name
   * @parms name
   * @returns data about director of movie in JSON format
   */
  getDirectors(name: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/directors/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint for genre by name
   * @params genre
   * @returns data about genre in JSON format
   */
  getGenre(genre: any): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/genre/' + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint for existing user by username
   * @returns data about existing user in JSON format
   */
  getUserProfile(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint for existing users Favorite movies list
   * @returns array of users Favorite movies list in JSON format
   */
  getUserFavoriteMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint to add movie to Favorite movies list by movieID
   * @param movieID
   * @returns array of users Favorite movies list with new added movie in JSON format
   */
  addMovieToFavoriteList(movieID: any): Observable<any> {
    return this.http
      .post(
        apiUrl + 'users/' + username + '/favorites/' + movieID,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint to delete movie from Favorites list by movieID
   * @param movieID
   * @returns new array of users Favorite movies list in JSON format
   */
  deleteMovieFromFavoriteList(movieID: any): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username + '/favorites/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint to edit existing user info
   * @param userData
   * @returns updated user info in JSON format
   */
  updateUserInfo(userData: any): Observable<any> {
    return this.http
      .put(apiUrl + 'users/' + username, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*
   * calls API endpoint to delete user and data
   * @returns if delete was successful and returns to login page
   */
  deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
