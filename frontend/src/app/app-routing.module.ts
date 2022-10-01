import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBorrowListingComponent } from './components/add-borrow-listing/add-borrow-listing.component';
import { AddFreeListingComponent } from './components/add-free-listing/add-free-listing.component';
import { AddWantedListingComponent } from './components/add-wanted-listing/add-wanted-listing.component';
import { EditFreeListingComponent } from './components/edit-free-listing/edit-free-listing.component';
import { HomeComponent } from './components/home/home.component';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { ListingComponent } from './components/listing/listing.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { MyListingComponent } from './components/my-listing/my-listing.component';
import { MyLocationComponent } from './components/my-location/my-location.component';
import { RequestComponent } from './components/request/request.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuardService } from './services/auth-service/auth-guard.service';

const routes: Routes = [
  {path:'', component:HomeComponent, canActivate:[AuthGuardService]},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuardService]},
  {path:'listing', component:ListingComponent, canActivate:[AuthGuardService]},
  {path:'listing-details/:id', component:ListingDetailsComponent, canActivate:[AuthGuardService]},
  {path:'request', component:RequestComponent, canActivate:[AuthGuardService]},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGuardService]},
  {path:'map', component:MapComponent, canActivate:[AuthGuardService]},
  {path:'free/add-listing', component:AddFreeListingComponent, canActivate:[AuthGuardService]},
  {path:'free/edit-listing/:id', component:EditFreeListingComponent, canActivate:[AuthGuardService]},
  {path:'add-borrow', component:AddBorrowListingComponent, canActivate:[AuthGuardService]},
  {path:'add-wanted', component:AddWantedListingComponent, canActivate:[AuthGuardService]},
  {path:'my-location', component:MyLocationComponent, canActivate:[AuthGuardService]},
  {path:'my-listing', component:MyListingComponent, canActivate:[AuthGuardService]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
