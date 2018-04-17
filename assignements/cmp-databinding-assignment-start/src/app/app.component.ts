import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allNumbers: number[] = [];
  currentNumber: number;

  newNumberReceived(event: number) {
    this.currentNumber = event;
    this.allNumbers.push(this.currentNumber);
    console.log("newNumberReceived", this.currentNumber);
  }
}
