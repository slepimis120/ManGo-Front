export class Location {
    private _address: string;
    private _latitude: number;
    private _longitude: number;
  
    constructor(address: string, latitude: number, longitude: number) {
      this._address = address;
      this._latitude = latitude;
      this._longitude = longitude;
    }
  
    get address(): string {
      return this._address;
    }
  
    set address(address: string) {
      this._address = address;
    }
  
    get latitude(): number {
      return this._latitude;
    }
  
    set latitude(latitude: number) {
      this._latitude = latitude;
    }
  
    get longitude(): number {
      return this._longitude;
    }
  
    set longitude(longitude: number) {
      this._longitude = longitude;
    }
  }