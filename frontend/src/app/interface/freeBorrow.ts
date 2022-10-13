export interface FreeBorrow {
    _id: string,
    userToken:string, 
    picture:any[],
    title: string,
    description: string,
    lendingInfo: string,
    listFor: number,
    location: Location,
    likes: any[],
    onHold:boolean,
    disable:boolean,
    createdAt: Date,
    updatedAt:Date
  }
  
  export interface Location {
    lng: number,
    lat: number
  }
