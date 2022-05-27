import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  // pass Angular Material dialog in constructor as and argument for use in component
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '350px',
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }
}
