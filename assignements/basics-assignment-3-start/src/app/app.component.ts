import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showPassPhraseFlag: boolean = false;
  logItems: Array<Date> = [];

  showPassphrase(): boolean {
    return this.showPassPhraseFlag;
  }

  buttonClick(): void {
    this.showPassPhraseFlag = !this.showPassPhraseFlag;
    this.logItems.push(new Date());
  }
}
