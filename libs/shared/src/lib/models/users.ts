export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image?: string;
}

export interface UserAuthenticationDto {
  email: string;
  password: string;
}

export interface UserRegistrationDto extends UserAuthenticationDto {
  username: string;
}

export interface UserRegistrationRequest {
  user: UserRegistrationDto;
}

export interface UserLoginRequest {
  user: UserAuthenticationDto;
}

export interface UserRegistrationResponse extends User {}

export interface UserLoginResponse extends User {}
