import { Driver } from "./driver.model";
import { VehicleType } from "../constants/constants";
import { Location } from "./location.model";
import { Passenger } from "./passenger.model";

export class Ride {
    private _driver: Driver;
    private _locations: Location[];
    private _passengers: Passenger[];
    private _vehicleType: VehicleType;
    private _babyTransport: boolean;
    private _petTransport: boolean;
    private _scheduledTime: Date;
    private _price : number;
    private _duration : number;
    private _distance : number;
  
    constructor(
      driver: Driver,
      locations: Location[],
      passengers: Passenger[],
      vehicleType: VehicleType,
      babyTransport: boolean,
      petTransport: boolean,
      scheduledTime: Date,
      price : number,
      duration : number,
      distance : number,
    ) {
      this._driver = driver;
      this._locations = locations;
      this._passengers = passengers;
      this._vehicleType = vehicleType;
      this._babyTransport = babyTransport;
      this._petTransport = petTransport;
      this._scheduledTime = scheduledTime;
      this._price = price;
      this._duration = duration;
      this._distance = distance;
    }
  
    get driver(): Driver {
      return this._driver;
    }
  
    set driver(driver: Driver) {
      this._driver = driver;
    }
  
    get locations(): Location[] {
      return this._locations;
    }
  
    set locations(locations: Location[]) {
      this._locations = locations;
    }
  
    get passengers(): Passenger[] {
      return this._passengers;
    }
  
    set passengers(passengers: Passenger[]) {
      this._passengers = passengers;
    }
  
    get vehicleType(): VehicleType {
      return this._vehicleType;
    }
  
    set vehicleType(vehicleType: VehicleType) {
      this._vehicleType = vehicleType;
    }
  
    get babyTransport(): boolean {
      return this._babyTransport;
    }
  
    set babyTransport(babyTransport: boolean) {
      this._babyTransport = babyTransport;
    }
  
    get petTransport(): boolean {
      return this._petTransport;
    }
  
    set petTransport(petTransport: boolean) {
      this._petTransport = petTransport;
    }
  
    get scheduledTime(): Date {
      return this._scheduledTime;
    }
  
    set scheduledTime(scheduledTime: Date) {
      this._scheduledTime = scheduledTime;
    }

    get price(): number {
      return this._price;
    }
  
    set price(price: number) {
      this._price = price;
    }
    get duration(): number {
      return this._duration;
    }
  
    set duration(duration: number) {
      this._duration = duration;
    }

    get distance(): number {
      return this._distance;
    }
  
    set distance(distance: number) {
      this._distance = distance;
    }
  }
  