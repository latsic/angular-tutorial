import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    h3 {
      color: lightblue;
    }
  `]
})
export class AppComponent {
  componentName: string = "AppComponent";
  
  title = 'my-first-app';
  name = "aha";


}
