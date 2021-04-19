export interface User {
  email: string,
  token: string,
  username: string,
  bio: string,
  image?: string,
}

export interface UserRegistrationRequest {
  email: string,
  username: string,
  password: string
};

export interface UserLoginRequest {
  email: string,
  username: string,
  password: string
};

export interface UserRegistrationResponse extends User {}

export interface UserLoginResponse extends User {}

