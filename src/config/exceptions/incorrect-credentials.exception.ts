import { HttpException, HttpStatus } from '@nestjs/common';
import { createToast } from '../feedback/feedback';

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
