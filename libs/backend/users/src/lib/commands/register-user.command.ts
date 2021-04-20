import { ICommand } from '@nestjs/cqrs';
import {} from 'class-validator';

export class RegisterUserCommand implements ICommand {
  @IsEmail()
  private _email: string;
  private _username: string;
  private _password: string;

  get email(): string {
    return this._email;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this.password;
  }

  constructor(
    private $email: string,
    private $username: string,
    private $password: string
  ) {
    this._email = this.$email;
    this._username = this.$username;
    this._password = this.$password;
  }
}
