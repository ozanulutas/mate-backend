import { HttpException, HttpStatus } from '@nestjs/common';
import { createToast } from '../notification/notification';

export class IncorrectCredentialsException extends HttpException {
  constructor() {
    super(
      {
        message: 'Incorrect credentials',
        ...createToast({ text: 'Incorrect credentials' }),
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
