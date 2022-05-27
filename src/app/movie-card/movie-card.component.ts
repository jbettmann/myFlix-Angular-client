import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { ProfileComponent } from '../profile/profile.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// Navigates to specified paged
import { Router } from '@angular/router';

// This component is design for rendering. That is it.
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  // movies returned from API will be kept
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  // called once Angular is done crating component. Lifecycle hook.
  // similar to componentDidMount or useEffect()
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMoviesList();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  getFavoriteMoviesList(): void {
    this.fetchApiData.getUserFavoriteMovies().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  isFav(id: string): boolean {
    return this.favorites.includes(id);
  }

  openDirectorComponent(
    name: string,
    bio: string,
    birthday: Date,
    death: Date
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
        Death: death,
      },
      // Assigning the dialog a width
      width: '500px',
    });
  }

  openGenreComponent(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assigning the dialog a width
      width: '500px',
    });
  }

  openSynopsisComponent(
    image: any,
    title: string,
    description: string,
    release: string
  ): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Image: image,
        Title: title,
        Description: description,
        Release: release,
      },
      // Assigning the dialog a width
      width: '500px',
    });
  }

  addFavoriteMovie(id: any): void {
    this.fetchApiData.addMovieToFavoriteList(id).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      console.log(response);
      this.snackBar.open('Movie added to you Favorites List!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
  removeFavoriteMovie(id: any): void {
    this.fetchApiData.deleteMovieFromFavoriteList(id).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      console.log(response);
      this.snackBar.open('Movie removed from Favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  openProfileView(): void {
    this.router.navigate(['profile']);
  }

  openAllMovies(): void {
    this.router.navigate(['movies']);
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
