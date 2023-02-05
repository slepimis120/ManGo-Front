export class Driver {
    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _profilePictureURL: string;
    private _phoneNumber: string;
    private _email: string;
    private _address: string;
    private _password: string;
    private _blocked: boolean;
  
    constructor(
      id: number,
      firstName: string,
      lastName: string,
      profilePictureURL: string,
      phoneNumber: string,
      email: string,
      address: string,
      password: string,
      blocked: boolean
    ) {
      this._id = id;
      this._firstName = firstName;
      this._lastName = lastName;
      this._profilePictureURL = profilePictureURL;
      this._phoneNumber = phoneNumber;
      this._email = email;
      this._address = address;
      this._password = password;
      this._blocked = blocked;
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
  
    get firstName(): string {
      return this._firstName;
    }
  
    set firstName(value: string) {
      this._firstName = value;
    }
  
    get lastName(): string {
      return this._lastName;
    }
  
    set lastName(value: string) {
      this._lastName = value;
    }
  
    get profilePictureURL(): string {
      return this._profilePictureURL;
    }
  
    set profilePictureURL(value: string) {
      this._profilePictureURL = value;
    }
  
    get phoneNumber(): string {
      return this._phoneNumber;
    }
  
    set phoneNumber(value: string) {
      this._phoneNumber = value;
    }
  
    get email(): string {
      return this._email;
    }
  
    set email(value: string) {
      this._email = value;
    }
  
    get address(): string {
      return this._address;
    }
  
    set address(value: string) {
      this._address = value;
    }
  
    get password(): string {
      return this._password;
    }
  
    set password(value: string) {
      this._password = value;
    }
  
    get blocked(): boolean {
      return this._blocked;
    }
  
    set blocked(value: boolean) {
      this._blocked = value;
    }
  }
  