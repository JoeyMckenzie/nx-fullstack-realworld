import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { isStringNullUndefinedOrEmpty } from '@nx-fullstack-realworld/shared';

const PASSWORD_ITERATIONS = 1000;
const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_SALT_LENGTH = 16;

@Injectable()
export class AuthenticationService {
  generateToken(userId: string, username: string, email: string): string {
    if (isStringNullUndefinedOrEmpty(process.env.TOKEN_SECRET)) {
      throw new HttpException(
        'Signing key was found, please verify the secret.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: userId,
        exp: exp.getTime() / 1000,
        username,
        email,
      },
      process.env.TOKEN_SECRET!
    );
  }

  private generateHash(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(
        password,
        salt,
        PASSWORD_ITERATIONS,
        PASSWORD_KEY_LENGTH,
        'sha512'
      )
      .toString('hex');
  }

  generateHashedPasswordWithSalt(
    password: string
  ): { salt: string; password: string } {
    const salt = crypto.randomBytes(PASSWORD_SALT_LENGTH).toString('hex');

    const hashedPassword = this.generateHash(password, salt);

    return {
      salt,
      password: hashedPassword,
    };
  }

  validatePassword(
    passwordAttempt: string,
    storedPassword: string,
    salt: string
  ): boolean {
    return storedPassword === this.generateHash(passwordAttempt, salt);
  }
}
