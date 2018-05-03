import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appStatus = new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve("stable")
    }, 2000);
  });

  completed: boolean = false;
  appStatus2 = Observable.create((observer: Observer<string>) => {
    
    let counter = 0;
    let intervalId = setInterval(() => {
      observer.next("state " + counter++);

      if(counter > 30) {
        clearInterval(intervalId);
        observer.complete();
        this.completed = true;
      }
    }, 1000);

  });

  

  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(2017, 1, 15)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(2017, 1, 15)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(2017, 1, 15)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(2017, 1, 15)
    }
  ];

  filterValue: string = "";

  getStatusClasses(
    server: {
      instanceType: string, name: string, status: string, started: Date
    }) {

      console.log(server.started);
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  onAddServer() {
    this.servers.push({
      instanceType: 'tiny',
      name: 'Integration Environment Server',
      status: 'offline',
      started: new Date(2017, 1, 15)
    });
  }

  ngOnInit() {

    for(let server of this.servers){
      console.log(server);
    }
  }
}
