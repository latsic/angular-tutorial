import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username: string = "";

  isUsernameEmpty(): boolean {
    return this.username.length == 0 ||
           this.username.trim() == "";
  }

  resetUsername(): void {
    this.username = "";
  }
}
