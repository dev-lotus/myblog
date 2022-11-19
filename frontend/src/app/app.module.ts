import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ImgurApiService } from './components/settings/imgur-api.service';

import { NgToastModule } from 'ng-angular-popup';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';
import { EditFreeListingComponent } from './components/edit-free-listing/edit-free-listing.component';
import { MyListingComponent } from './components/my-listing/my-listing.component';
import { EditFreeBorrowComponent } from './components/edit-free-borrow/edit-free-borrow.component';
import { EditFreeWantedComponent } from './components/edit-free-wanted/edit-free-wanted.component';
import { DatePipe } from '@angular/common';


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
    RequestComponent,
    EditFreeListingComponent,
    MyListingComponent,
    EditFreeBorrowComponent,
    EditFreeWantedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    NgToastModule ,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    },
    ImgurApiService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
