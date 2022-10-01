export interface FreeListing {
    _id: string,
    userToken:string, 
    picture:any[],
    title: string,
    category: string,
    description: string,
    pickUpTime: string,
    listFor: number,
    location: Location,
    likes: any[],
    disable:boolean,
    createdAt: Date,
    updatedAt:Date
  }
  
  export interface Location {
    lng: number,
    lat: number
  }
