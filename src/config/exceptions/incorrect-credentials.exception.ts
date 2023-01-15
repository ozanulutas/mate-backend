import { HttpException, HttpStatus } from '@nestjs/common';
import { createToast } from '../notification/notification';
import { ToastType } from '../notification/notification.enum';

export class IncorrectCredentialsException extends HttpException {
  constructor() {
    super(
      {
        message: 'Incorrect credentials',
        ...createToast({
          text: 'Incorrect credentials',
          type: ToastType.ERROR,
        }),
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
