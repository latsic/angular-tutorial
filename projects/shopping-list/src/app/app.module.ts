import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
//import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { reducers } from "./store/app.reducers";
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //HttpModule,
    HttpClientModule,
    SharedModule,
    //AuthModule,
    CoreModule,
    //ShoppingListModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
} 
