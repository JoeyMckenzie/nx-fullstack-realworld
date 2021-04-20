import { Maybe } from '@nx-fullstack-realworld/shared';
import { IsEmail, IsString } from 'class-validator';

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image?: string;
}

// export class UserRegistrationRequest {
//   @IsEmail()
//   readonly email: string;

//   @IsString()
//   readonly username: string;

//   @IsString()
//   readonly password: string;

//   constructor(
//     private _email: string,
//     private _username: string,
//     private _password: string
//   ) {
//     this.email = this._email;
//     this.username = this._username;
//     this.password = this._password;
//   }
// }

export interface UserRegistrationRequest {
  email: string;
  username: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  username: string;
  password: string;
}

export interface UserRegistrationResponse extends User {}

export interface UserLoginResponse extends User {}
