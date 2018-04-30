import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Output()
  // featureSelected = new EventEmitter<string>();

  constructor(
    private dsService: DataStorageService,
    private recipeService: RecipeService,
    public authService: AuthService) {
  }

  ngOnInit() {
  }

  onSaveData(): void {
    this.dsService.storeRecipes()
      .subscribe(
        (response: Response) => {
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
