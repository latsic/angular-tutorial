import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  
  currentNumber: number = 0;
  intervalId: any = null;

  constructor() { }

  @Output()
  oddEvent = new EventEmitter<number>();

  @Output()
  evenEvent = new EventEmitter<number>();

  ngOnInit() {
  }

  startGame(): void {

    if(this.intervalId == null) {

      this.intervalId = setInterval(() =>{
        console.log("emitting new Number: " + this.currentNumber);
        this.currentNumber % 2 == 0
          ? this.evenEvent.emit(this.currentNumber)
          : this.oddEvent.emit(this.currentNumber);

        this.currentNumber++
      }, 500);
    }

  }

  stopGame(): void {

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

}
