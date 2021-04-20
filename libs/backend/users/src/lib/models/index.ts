import { UserRegistrationRequest } from '@nx-fullstack-realworld/shared';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegistrationDto implements UserRegistrationRequest {
  @IsEmail()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly username!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
