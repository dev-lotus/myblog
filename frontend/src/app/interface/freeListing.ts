export interface FreeListing {
    _id: string,
    userToken:string, 
    picture:any[],
    title: string,
    category: string,
    description: string,
    pickUpTime: string,
    listFor: number,
    location: Location
  }
  
  export interface Location {
    lng: number,
    lat: number
  }