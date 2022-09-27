import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImgbbUploadService } from 'src/app/services/imgbb-upload/imgbb-upload.service';
import { NgToastService } from 'ng-angular-popup';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/interface/user';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
 
  user:User[]= [];

  userToken!: string;
  userProfilePicture! : string;
  status: any;
  errMsg: any;
  constructor(private spinner: NgxSpinnerService, private _toast: NgToastService, private readonly ImgbbService : ImgbbUploadService, private _router:Router, private _userService: UserServiceService) {
    this.userToken = String(localStorage.getItem("userId"));
    
   }

  ngOnInit(): void {
    this.getUserData();
    console.log(this.user);
  }
  getUserData() {
    this.spinner.show();
    this._userService.getUserDataById(this.userToken).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.user = res;
        console.log(this.user);
        this.userProfilePicture = this.user[0].profilePicture;
        console.log(this.userProfilePicture);
        
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.user = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get User Data method excuted successfully"))
  }

  onInput(file: any) {
   this.ImgbbService
      .upload(file.target.files[0])
      .subscribe((res:any) => {
        this.userProfilePicture = res['data']['url']
        console.log(this.userProfilePicture);
        this._userService.updateUserProfilePicture(this.userToken, this.userProfilePicture).subscribe(
          res => {
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 1000);
            this.status = res;
            console.log(this.status);
            if (this.status == true) {
              this._toast.success({ detail: "UPDATE SUCCESS", summary: 'Your profile picture have been updated',position: 'br'});
         
              localStorage.setItem("profilePicture", this.userProfilePicture);
             
              this._router.navigate(['/settings'])
              .then(() => {
                window.location.reload();
              });
    
            }
            else {
              this._toast.warning({ detail: "UPDATE FAILED", summary: 'Unable to update your profile picture',position: 'br'});
              setTimeout(function () {
                window.location.reload();
              }, 2000);
            }
    
          }, err => {
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 1000);
           this.errMsg = err;
            console.log(this.errMsg);
            this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime',position: 'br'});
            setTimeout(function () {
              window.location.reload();
            }, 2000);

          }, () => console.log(" Update User Profile Picture method excuted successfully")
        )
      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime',position: 'br'});
        setTimeout(function () {
          window.location.reload();
        }, 2000);

      }, () => console.log("Imgbb method excuted successfully"))
  }

  updateUserData(updateForm: NgForm) {
    console.log(updateForm);
  }

  

}
