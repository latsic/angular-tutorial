import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  queryParamsSubscription: Subscription;
  fragmentSubscription: Subscription;
  paramsSubscription: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) {


    }

  ngOnInit() {

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        console.log(queryParams);
        this.allowEdit = queryParams["allowEdit"] === "1";
      }
    );

    this.fragmentSubscription = this.route.fragment.subscribe(
      (fragment) => {
        console.log(fragment);
      }
    );

    //this.server = this.serversService.getServer(1);
    this.server = this.serversService.getServer(+this.route.snapshot.params["id"]);
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params["id"]);
      }
    )


    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(
      this.server.id,
      {name: this.serverName, status: this.serverStatus}
    );
    this.changesSaved = true;
    this.router.navigate(
      ["../"], 
      {relativeTo: this.route}
    );

  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }

  canDeactivate(): Observable <boolean> | Promise<boolean> | boolean {
    
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName !== this.server.name ||
       this.serverStatus !== this.server.status) &&
       !this.changesSaved) {

        return confirm("Do you want to discard the changes");
    }
    else {
      return true;
    }


  }

}
