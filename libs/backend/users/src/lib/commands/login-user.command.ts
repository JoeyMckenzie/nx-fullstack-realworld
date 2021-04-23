import { ICommand } from '@nestjs/cqrs';

export class LoginUserCommand implements ICommand {
  readonly email: string;
  readonly password: string;

  constructor(private _email: string, private _password: string) {
    this.email = this._email;
    this.password = this._password;
  }
}
