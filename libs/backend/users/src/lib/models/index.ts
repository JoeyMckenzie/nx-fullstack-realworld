import {
  UserRegistrationRequest,
  UserRegistrationDto,
} from '@nx-fullstack-realworld/shared';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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
  @IsNotEmpty()
  @ValidateNested()
  user!: RegistrationDto;
}
