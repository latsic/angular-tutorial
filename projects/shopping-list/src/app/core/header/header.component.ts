import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent } from '@angular/common/http';
import * as fromApp from "../../store/app.reducers"
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";

import * as fromAuth from "../../auth/store/auth.reducers";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  // @Output()
  // featureSelected = new EventEmitter<string>();

  constructor(
    private dsService: DataStorageService,
    private recipeService: RecipeService,
    public authService: AuthService,
    private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {

    this.authState = this.store.select("auth");
  }

  onSaveData(): void {
    // this.dsService.storeRecipes()
    //   .subscribe(
    //     (response: HttpEvent<Object>) => {
    //       console.log("onSaveData ok", response);
    //     },
    //     (error) => {
    //       console.log("onSaveData error", error);
    //     }
    //   );
    this.dsService.storeRecipes()
      .subscribe(
        (response: HttpEvent<Object>) => {
          console.log("onSaveData ok", response);
        },
        (error) => {
          console.log("onSaveData error", error);
        }
      );
  }

  onFetchData(): void {

    this.dsService.getRecipes();
  }

  onLogout(): void {
    this.authService.logout();
  }

  // onSelect(feature: string): void {
  //   this.featureSelected.emit(feature);
  //   console.log("onSelect", feature);
  // }

}
