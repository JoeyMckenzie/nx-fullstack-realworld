import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
  readonly email: string;
  readonly username: string;
  readonly password: string;

  constructor(
    private _email: string,
    private _username: string,
    private _password: string
  ) {
    this.email = this._email;
    this.username = this._username;
    this.password = this._password;
  }
}
