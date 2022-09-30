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
 
  user:User[]= [
    {
      _id: "",
      profilePicture: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      mobileNumber: "",
      aboutYou: "",
      likes: [],
      dislikes: [],
      myLocation: {
        "lng": 88.48699665399437,
        "lat": 23.412221981538707
  
  }
    }
  ];

  userToken!: string;
  userProfilePicture! : string;
  status: any;
  errMsg: any;
  userLikeArr!:any[];
  userDislikeArr!:any[];

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
        this.userLikeArr = this.user[0].likes;
        this.userDislikeArr = this.user[0].dislikes;
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
    
    this.spinner.show();
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

  addLike()
  {
    var getLikeInputBoxVal = document.getElementById("likesInp") as HTMLInputElement;;
    this.userLikeArr.push(getLikeInputBoxVal.value);
  }
  addDislike()
  {
    var getDislikeInputBoxVal = document.getElementById("dislikesInp") as HTMLInputElement;;
    this.userDislikeArr.push(getDislikeInputBoxVal.value);
  }

  removeLike(indexNumber: number, indexVal:string) {
    
   if(this.userLikeArr[indexNumber] == indexVal)
   {
    this.userLikeArr.splice(indexNumber,1);
   }
   console.log(this.userLikeArr);

  }
  
  removeDislike(indexNumber: number, indexVal:string) {
    
    if(this.userDislikeArr[indexNumber] == indexVal)
    {
     this.userDislikeArr.splice(indexNumber,1);
    }
    console.log(this.userDislikeArr);
 
   }


  updateUserData(updateForm: NgForm) {
    
    this.spinner.show();
    this._userService.updateUserData(String(this.user[0]._id), updateForm.value.firstName, updateForm.value.lastName, updateForm.value.mobileNumber, updateForm.value.aboutYou, this.userLikeArr, this.userDislikeArr ).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({ detail: "UPDATE SUCCESS", summary: 'Your profile details have been updated',position: 'br'});

          localStorage.setItem("firstName", updateForm.value.firstName);
          localStorage.setItem("lastName", updateForm.value.lastName);
          localStorage.setItem("mobileNumber", updateForm.value.mobileNumber);
          setTimeout(function () {
            window.location.reload();
          }, 2000);
          this._router.navigate(['/settings'])
          .then(() => {
            window.location.reload();
          });
        }
        else {
          this._toast.warning({ detail: "UPDATE FAILED", summary: 'Unable to update your profile',position: 'br'});

        }

      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.errMsg = err;
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime',position: 'br'});

      },
      () => console.log("Update User Settings successfully")
    )
  }

  

}
