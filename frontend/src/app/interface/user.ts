export interface User {
    _id: string,
    profilePicture: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    mobileNumber: string,
    aboutYou: string,
    likes: any[],
    dislikes: any[],
    myLocation: MyLocation
  }
  
  export interface MyLocation {
    lng: number,
    lat: number
  }