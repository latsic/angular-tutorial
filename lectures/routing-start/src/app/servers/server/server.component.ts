import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};

  paramsSubscription: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    //this.server = this.serversService.getServer(1);
    
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data["server"];
      }
    );

    // const serverId: number = +this.route.snapshot.params["id"];
    // this.server = this.serversService.getServer(serverId);
   
    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     if(params["id"]) {
    //       this.server = this.serversService.getServer(+params["id"]);
    //     }
    //   }
    // );

    // const serverId = this.route.snapshot.params["id"];
    // this.server = this.serversService.getServer(serverId);

    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(params['id']);
    //   }
    // )

  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onEdit(): void {

    console.log("this route", this.route);

    this.router.navigate(
      ["edit"],
      {
        relativeTo: this.route,
        queryParamsHandling: 'preserve'
      });
  }


}
