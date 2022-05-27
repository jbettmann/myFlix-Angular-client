import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.scss'],
})
export class UserUpdateDialogComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Allows user to update info such as Username, Password, Email or Birthday
  updateUserProfile(): void {
    this.fetchApiData.updateUserInfo(this.userData).subscribe((response) => {
      console.log(response);
      this.dialogRef.close();
      this.snackBar.open('Profile successfully updated!', 'OK', {
        duration: 2000,
      });
      // Log out user if they update Username or Password to avoid errors
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please login with new credentials', 'OK', {
          duration: 2000,
        });
      }
    });
  }
}
