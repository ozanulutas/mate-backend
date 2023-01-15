import { HttpException, HttpStatus } from '@nestjs/common';
import { createNotification } from '../feedback/feedback';

export class IncorrectCredentialsException extends HttpException {
  constructor() {
    super(
      {
        message: 'Incorrect credentials',
        ...createNotification({ text: 'Incorrect credentials' }),
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
