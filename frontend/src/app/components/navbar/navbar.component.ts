import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: string = "";
  profilePicture: string = "";
  constructor(private router: Router,private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.currentUser = String(localStorage.getItem("firstName")) ;
    this.profilePicture = String(localStorage.getItem("profilePicture")) ;
  }

  logoutUser()
  {
    this.authService.signOut(true);
    localStorage.clear();
    setTimeout(() => {
     
    }, 3000); 
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  
  }

}
