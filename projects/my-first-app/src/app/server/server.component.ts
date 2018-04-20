import { Component } from "@angular/core";


@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"]
})
export class ServerComponent {
  componentName: string = "ServerComponent";

  serverId: number = 10;
  serverStatus: string = "offline";
  serverName: string = "";

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? "online" : "offline";

    let counter: number = 0;

    let intervalId = setInterval(() => {
      if(this.serverStatus == "online"){
        this.serverStatus = "offline";
      }
      else{
        this.serverStatus = "online";
      }
      if(++counter > 20){
        clearInterval(intervalId);
      }
    }, 3000);
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor(): string {
    return this.serverStatus == "online" ? "green" : "red";
  }
}