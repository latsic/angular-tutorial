import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dsService: DataStorageService) {

  }

  ngOnInit() {
  }

  onSignin(form: NgForm): void {
    const email: string = form.value.email;
    const password: string = form.value.password;
    this.authService.signinUser(email, password)
      .then(() => {
        this.dsService.getRecipes();
      })
      .catch(() => {

      });
  }

}
