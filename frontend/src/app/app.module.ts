import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MapComponent } from './components/map/map.component';
import { AddFreeListingComponent } from './components/add-free-listing/add-free-listing.component';
import { AddWantedListingComponent } from './components/add-wanted-listing/add-wanted-listing.component';
import { AddBorrowListingComponent } from './components/add-borrow-listing/add-borrow-listing.component';
import { MyLocationComponent } from './components/my-location/my-location.component';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { RequestComponent } from './components/request/request.component';

const CLIENT_ID = "39639459278-dgjd1pif6o14m1c1le0hsi3244ml1bjr.apps.googleusercontent.com";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ListingComponent,
    SettingsComponent,
    MapComponent,
    AddFreeListingComponent,
    AddWantedListingComponent,
    AddBorrowListingComponent,
    MyLocationComponent,
    ListingDetailsComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
