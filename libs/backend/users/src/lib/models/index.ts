import {
  UserRegistrationRequest,
  UserRegistrationDto,
  UserLoginRequest,
  UserAuthenticationDto,
} from '@nx-fullstack-realworld/shared';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RegistrationDto implements UserRegistrationDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly username!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}

export class RegistrationRequest implements UserRegistrationRequest {
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => RegistrationDto)
  user!: RegistrationDto;
}

class LoginDto implements UserAuthenticationDto {
  @IsEmail()
  readonly email!: string;


  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}

export class LoginRequest implements UserLoginRequest {
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => LoginDto)
  user!: LoginDto;
}
