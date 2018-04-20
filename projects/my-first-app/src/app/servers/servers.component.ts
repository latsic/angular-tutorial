import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //selector: '[app-servers]',
  //selector: '.app-servers',
  templateUrl: './servers.component.html',
  //template: `
  //  <h3>Inside the servers component</h3>
  //  <app-server></app-server>
  //  <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  componentName: string = "ServersComponent";
  allowNewServer: boolean = false;
  serverCreationStatus: string = "No server was created"; 
  serverName: string = "Test Server init";
  serverCreated: boolean = false;
  servers: Array<string> = ["Server 1", "Server 2"];

  constructor() {
    setTimeout(
      () => {
        this.allowNewServer = true;
      }
      ,2000);
  }

  ngOnInit() {
  }

  onCreateServer(): void {
    this.serverCreationStatus = 
      "server was created " + `the name is '${this.serverName}'`;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }
  onUpdateServerName(event: Event): void {
    this.serverName = (<HTMLInputElement>(event.target)).value;
  }

}
