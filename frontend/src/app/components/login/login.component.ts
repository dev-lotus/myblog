import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  status: boolean = false;
  errMsg!: string;
  title = 'angular-google';
  user:any;
  loggedIn!:boolean;


  constructor(private authService: SocialAuthService, private _userServices: UserServiceService ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      console.log(this.loggedIn);

      if(this.loggedIn == true)
      {
        const firstName = this.user.firstName;
        const lastName = this.user.lastName;
        const emailAddress = this.user.email;
        
        this._userServices.registerUser(firstName,lastName,emailAddress).subscribe(
          res=>{
            this.status = res;
            console.log("LOGIN SUCCESS")
            console.log(this.status);
          },err=>{
            console.log("TRY AGAIN LATER !")
          }, () => console.log("Login method excuted successfully"))
      }
    });
  }
  
  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signOut(): void {
    this.authService.signOut();
  }
}
