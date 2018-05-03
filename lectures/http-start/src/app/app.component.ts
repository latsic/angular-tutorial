import { Component } from '@angular/core';
import { ServersService } from './servers.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  appName = this.serversService.getAppName();
  
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];


  constructor(private serversService: ServersService) {

  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  onSave() {

    const timeOrigin: number = window.performance.now();

    this.serversService.storeServers(this.servers)
      .subscribe(
        (response) => {
          console.log("post response:", response);
          const timeNow = window.performance.now() - timeOrigin;
          console.log(String(timeNow) + " millis")
        },
        (error) => {
          console.log("post error", error);
        }
      );
  }

  onGet() {
    this.serversService.getServers().subscribe(
      (servers: any[]) => {
        console.log("get response", servers);
        this.servers = servers;
      },
      (error) => {
        console.log("get error", error);
      }
    );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}


// https://udemy-angular-http-486e9.firebaseio.com/
