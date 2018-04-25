import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AuthModule {

}