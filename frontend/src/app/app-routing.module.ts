import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListingComponent } from './components/listing/listing.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { MessageComponent } from './components/message/message.component';
import { RequestItemComponent } from './components/request-item/request-item.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuardService } from './services/auth-service/auth-guard.service';

const routes: Routes = [
  {path:'', component:HomeComponent, canActivate:[AuthGuardService]},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuardService]},
  {path:'listing', component:ListingComponent, canActivate:[AuthGuardService]},
  {path:'request/:id', component:RequestItemComponent, canActivate:[AuthGuardService]},
  {path:'message', component:MessageComponent, canActivate:[AuthGuardService]},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGuardService]},
  {path:'map', component:MapComponent, canActivate:[AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
