import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // Defines components inputs
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user data from api call and sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUser
   */
  getUser(): void {
    this.fetchApiData.getUserProfile().subscribe((response) => {
      console.log(response);
      this.user = response;
      return this.user;
    });
  }

  /**
   * opens the edit profile dialog from EditProfileComponent to allow user to edit their details
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserUpdateDialogComponent, {
      // Assigning the dialog a width
      width: '500px',
    });
  }

  /**
   * deletes the user profile, redirects to welcome screen
   * @function deleteUser
   */
  deleteUserProfile(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This cannot be undone.'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account successfully deleted.', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log(response);
        localStorage.clear();
      });
    }
  }

  /**
   * Logs user out and clears localStorage of user data
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  /**
   * Navigates to movie component
   */
  openAllMovies(): void {
    this.router.navigate(['movies']);
  }
}
